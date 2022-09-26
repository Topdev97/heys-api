import { ContractInterface, ethers } from 'ethers'
import { RPC_URL, GATHERING_ADDRESSES } from '../config/consts'
import gatheringAbi from './abis/GatheringAbi.json'
import db from '../db'
const Doc = db.doc

export function getGatheringContract() {
  const provider = ethers.getDefaultProvider(RPC_URL)

  return new ethers.Contract(
    GATHERING_ADDRESSES['blockchain-gathering'],
    gatheringAbi as ContractInterface,
    provider
  )
}

export function startListeners() {
  const gatheringContract = getGatheringContract()

  gatheringContract.on('DocApproved', async _docId => {
    await Doc.update(
      { approved: true },
      {
        where: { docId: Number(_docId) },
      }
    ).catch(err => console.log(err))
  })
}
