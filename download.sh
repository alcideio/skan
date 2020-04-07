#!/usr/bin/env bash

# Copyright - Alcide IO
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

PROJECT_NAME="skan"

: ${USE_SUDO:="true"}
: ${SKAN_INSTALL_DIR:="/usr/local/bin"}

# initArch discovers the architecture for this system.
initArch() {
  ARCH=$(uname -m)
  case $ARCH in
    armv5*) ARCH="armv5";;
    armv6*) ARCH="armv6";;
    armv7*) ARCH="arm";;
    aarch64) ARCH="arm64";;
    x86) ARCH="386";;
    x86_64) ARCH="amd64";;
    i686) ARCH="386";;
    i386) ARCH="386";;
  esac
}

# initOS discovers the operating system for this system.
initOS() {
  OS=$(echo `uname`|tr '[:upper:]' '[:lower:]')

  case "$OS" in
    # Minimalist GNU for Windows
    mingw*) OS='windows';;
  esac
}

# runs the given command as root (detects if we are root already)
runAsRoot() {
  local CMD="$*"

  if [ $EUID -ne 0 -a $USE_SUDO = "true" ]; then
    CMD="sudo $CMD"
  fi

  $CMD
}

# verifySupported checks that the os/arch combination is supported for
# binary builds.
verifySupported() {
  local supported="darwin-386\ndarwin-amd64\nlinux-386\nlinux-amd64\nlinux-arm\nlinux-arm64\nlinux-ppc64le\nwindows-386\nwindows-amd64"
  if ! echo "${supported}" | grep -q "${OS}-${ARCH}"; then
    echo "No prebuilt binary for ${OS}-${ARCH}."
    echo "To build from source, go to https://github.com/alcideio/skan"
    exit 1
  fi

  if ! type "curl" > /dev/null && ! type "wget" > /dev/null; then
    echo "Either curl or wget is required"
    exit 1
  fi
}

# checkDesiredVersion checks if the desired version is available.
checkDesiredVersion() {
  if [ "x$DESIRED_VERSION" == "x" ]; then
    # Get tag from release URL
    local latest_release_url="https://github.com/alcideio/skan/releases"
    if type "curl" > /dev/null; then
      TAG=$(curl -Ls $latest_release_url | grep 'href="/alcideio/skan/releases/tag/v3.' | grep -v no-underline | head -n 1 | cut -d '"' -f 2 | awk '{n=split($NF,a,"/");print a[n]}' | awk 'a !~ $0{print}; {a=$0}')
    elif type "wget" > /dev/null; then
      TAG=$(wget $latest_release_url -O - 2>&1 | grep 'href="/alcideio/skan/releases/tag/v3.' | grep -v no-underline | head -n 1 | cut -d '"' -f 2 | awk '{n=split($NF,a,"/");print a[n]}' | awk 'a !~ $0{print}; {a=$0}')
    fi
  else
    TAG=$DESIRED_VERSION
  fi
}

# checkSkanInstalledVersion checks which version of skan is installed and
# if it needs to be changed.
checkSkanInstalledVersion() {
  if [[ -f "${SKAN_INSTALL_DIR}/${PROJECT_NAME}" ]]; then
    local version=$("${SKAN_INSTALL_DIR}/${PROJECT_NAME}" version --template="{{ .Version }}")
    if [[ "$version" == "$TAG" ]]; then
      echo "Skan ${version} is already ${DESIRED_VERSION:-latest}"
      return 0
    else
      echo "Skan ${TAG} is available. Changing from version ${version}."
      return 1
    fi
  else
    return 1
  fi
}

# downloadFile downloads the latest binary package and also the checksum
# for that binary.
downloadFile() {
  SKAN_DIST="skan-$TAG-$OS-$ARCH.tar.gz"
  DOWNLOAD_URL="https://get.skan.sh/$SKAN_DIST"
  CHECKSUM_URL="$DOWNLOAD_URL.sha256"
  SKAN_TMP_ROOT="$(mktemp -dt skan-installer-XXXXXX)"
  SKAN_TMP_FILE="$SKAN_TMP_ROOT/$SKAN_DIST"
  SKAN_SUM_FILE="$SKAN_TMP_ROOT/$SKAN_DIST.sha256"
  echo "Downloading $DOWNLOAD_URL"
  if type "curl" > /dev/null; then
    curl -SsL "$CHECKSUM_URL" -o "$SKAN_SUM_FILE"
  elif type "wget" > /dev/null; then
    wget -q -O "$SKAN_SUM_FILE" "$CHECKSUM_URL"
  fi
  if type "curl" > /dev/null; then
    curl -SsL "$DOWNLOAD_URL" -o "$SKAN_TMP_FILE"
  elif type "wget" > /dev/null; then
    wget -q -O "$SKAN_TMP_FILE" "$DOWNLOAD_URL"
  fi
}

# installFile verifies the SHA256 for the file, then unpacks and
# installs it.
installFile() {
  SKAN_TMP="$SKAN_TMP_ROOT/$PROJECT_NAME"
  local sum=$(openssl sha1 -sha256 ${SKAN_TMP_FILE} | awk '{print $2}')
  local expected_sum=$(cat ${SKAN_SUM_FILE})
  if [ "$sum" != "$expected_sum" ]; then
    echo "SHA sum of ${SKAN_TMP_FILE} does not match. Aborting."
    exit 1
  fi

  mkdir -p "$SKAN_TMP"
  tar xf "$SKAN_TMP_FILE" -C "$SKAN_TMP"
  SKAN_TMP_BIN="$SKAN_TMP/$OS-$ARCH/$PROJECT_NAME"
  echo "Preparing to install $PROJECT_NAME into ${SKAN_INSTALL_DIR}"
  runAsRoot cp "$SKAN_TMP_BIN" "$SKAN_INSTALL_DIR"
  echo "$PROJECT_NAME installed into $SKAN_INSTALL_DIR/$PROJECT_NAME"
}

# fail_trap is executed if an error occurs.
fail_trap() {
  result=$?
  if [ "$result" != "0" ]; then
    if [[ -n "$INPUT_ARGUMENTS" ]]; then
      echo "Failed to install $PROJECT_NAME with the arguments provided: $INPUT_ARGUMENTS"
      help
    else
      echo "Failed to install $PROJECT_NAME"
    fi
    echo -e "\tFor support, go to https://github.com/alcideio/skan."
  fi
  cleanup
  exit $result
}

# testVersion tests the installed client to make sure it is working.
testVersion() {
  set +e
  SKAN="$(which $PROJECT_NAME)"
  if [ "$?" = "1" ]; then
    echo "$PROJECT_NAME not found. Is $SKAN_INSTALL_DIR on your "'$PATH?'
    exit 1
  fi
  set -e
}

# help provides possible cli installation arguments
help () {
  echo "Accepted cli arguments are:"
  echo -e "\t[--help|-h ] ->> prints this help"
  echo -e "\t[--version|-v <desired_version>] . When not defined it fetches the latest release from GitHub"
  echo -e "\te.g. --version v3.0.0 or -v canary"
  echo -e "\t[--no-sudo]  ->> install without sudo"
}

# cleanup temporary files
cleanup() {
  if [[ -d "${SKAN_TMP_ROOT:-}" ]]; then
    rm -rf "$SKAN_TMP_ROOT"
  fi
}

# Execution

#Stop execution on any error
trap "fail_trap" EXIT
set -e

# Parsing input arguments (if any)
export INPUT_ARGUMENTS="${@}"
set -u
while [[ $# -gt 0 ]]; do
  case $1 in
    '--version'|-v)
       shift
       if [[ $# -ne 0 ]]; then
           export DESIRED_VERSION="${1}"
       else
           echo -e "Please provide the desired version. e.g. --version v3.0.0 or -v canary"
           exit 0
       fi
       ;;
    '--no-sudo')
       USE_SUDO="false"
       ;;
    '--help'|-h)
       help
       exit 0
       ;;
    *) exit 1
       ;;
  esac
  shift
done
set +u

initArch
initOS
verifySupported
checkDesiredVersion
if ! checkSkanInstalledVersion; then
  downloadFile
  installFile
fi
testVersion
cleanup