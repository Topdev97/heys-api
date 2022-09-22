'use strict'

module.exports = {
  async up(umzugContext) {
    /**
     * Add seed commands here.
     */
    const db = umzugContext.context
    const Doc = db.doc
    await Doc.create({
      title: 'Sample Doc A',
      description: 'A sample doc which has been approved',
      tags: ['tag-A', 'tag-B'],
      approved: true,
      slug: 'sample-doc-a',
      url: 'https://docs.google.com/spreadsheets/d/1CqPAGTcVnX5e01_5TaoUYnMPrclTvncPuESk8wo4pNQ/edit#gid=0',
      docUid: '1CqPAGTcVnX5e01_5TaoUYnMPrclTvncPuESk8wo4pNQ',
      docId: 0,
      docType: 1,
      gatheringId: 1,
    })
    await Doc.create({
      title: 'Sample Doc B',
      description: 'Another sample doc which has been approved',
      tags: ['tag-B', 'tag-C'],
      approved: true,
      slug: 'sample-doc-b',
      url: 'https://docs.google.com/document/d/11OWpLcDsZP59U7uBHylBGnuluoCN0aQECIQLzzcTcVE/edit',
      docUid: '11OWpLcDsZP59U7uBHylBGnuluoCN0aQECIQLzzcTcVE',
      docId: 1,
      docType: 0,
      gatheringId: 1,
    })
    await Doc.create({
      title: 'Sample Doc C',
      description: "A sample doc which hasn't been approved yet",
      tags: ['tag-A'],
      slug: 'sample-doc-c',
      url: 'https://docs.google.com/document/d/1gTPIQMLVcv_OQ8flblVTCWWfrGadQNxZXNZTvDh6iKA/edit',
      docUid: '1gTPIQMLVcv_OQ8flblVTCWWfrGadQNxZXNZTvDh6iKA',
      docId: 2,
      docType: 0,
      gatheringId: 1,
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
  },
}
