#!/bin/bash
  
NEXTTX=$(~/bitmark/src/bitmark-cli gettxout $1 0)

echo "${NEXTTX}"
