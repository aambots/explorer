#!/bin/bash
  
RAWTX=$(/home/ubuntu/bitmark/src/bitmark-cli getrawtransaction "$1")

#echo ${RAWTX}

DECODED=$(/home/ubuntu/bitmark/src/bitmark-cli decoderawtransaction $RAWTX )


echo "${DECODED}"
