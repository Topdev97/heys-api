import { ContractInterface, ethers } from 'ethers'
import { RPC_URL, GATHERING_ADDRESSES } from '../config/consts'
import gatheringAbi from './abis/GatheringAbi.json'
import db from '../db'
const Doc = db.doc
const Tag = db.tag

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
    console.log(`Approving doc ${Number(_docId)}`)
    
    const docToApprove = await Doc.findOne({ where: { docId: Number(_docId) } })
    if (docToApprove) {
      await docToApprove.update({ approved: true })
      await docToApprove.save()

      docToApprove.tags.forEach(async tag => {
        const existingTag = await Tag.findOne({ where: { title: tag } })
        if (!existingTag) {
          await Tag.create({ gatheringId: docToApprove.gatheringId, title: tag })
        } else {
          await existingTag.update({ count: existingTag.count + 1 })
          await existingTag.save()
        }
      })
    }
  })
}
