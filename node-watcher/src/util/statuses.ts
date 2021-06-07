// Copyright 2018-2020 @paritytech/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export const preimageStatus = {
  INVALID: 'PreimageUsed',
  MISSING: 'PreimageMissing',
  NOTED: 'PreimageNoted',
  REAPED: 'PreimageReaped',
  USED: 'PreimageUsed',
};

export const proposalStatus = {
  PROPOSED: 'Proposed',
  TABLED: 'Tabled',
  CLEARED: 'Cleared',
};

export const referendumStatus = {
  CANCELLED: 'Cancelled',
  EXECUTED: 'Executed',
  NOTPASSED: 'NotPassed',
  PASSED: 'Passed',
  STARTED: 'Started',
};

export const motionStatus = {
  EXECUTED: 'Executed',
  APPROVED: 'Approved',
  DISAPPROVED: 'Disapproved',
  PROPOSED: 'Proposed',
  VOTED: 'Voted',
};

export const treasuryProposalStatus = {
  PROPOSED: 'Proposed',
  TABLED: 'Awarded',
  REJECTED: 'Rejected',
};

export const tipStatus = {
  OPENED: 'TipOpened',
  CLOSED: 'TipClosed',
  CLOSING: 'TipClosing',
  RETRACTED: 'TipRetracted'
};

export const bountyStatus = {
  PROPOSED: 'BountyProposed',
  BECAME_ACTIVE: 'BountyBecameActive',
  AWARDED: 'BountyAwarded',
  CLAIMED: 'BountyClaimed',
  CANCELED: 'BountyCanceled',
  REJECTED: 'BountyRejected',
  EXTENDED: 'BountyExtended'
};

export const techCommitteeStatus = {
  APPROVED: 'Approved',
  CLOSED: 'Closed',
  DISAPPROVED: 'Disapproved',
  EXECUTED: 'Executed',
  PROPOSED: 'Proposed',
  MEMBER_EXECUTED: 'MemberExecuted',
  VOTED: 'Voted'
}

