#!/bin/bash
  
RAWTX=$(~/bitmark/src/bitmark-cli getrawtransaction "$1")

#echo ${RAWTX}

DECODED=$(~/bitmark/src/bitmark-cli decoderawtransaction $RAWTX )


echo "${DECODED}"
