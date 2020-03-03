import { OnchainMotionFragment, OnchainProposalFragment, OnchainReferendumFragment, OnchainTreasuryProposalFragment } from './generated/chain-db-graphql';
import { DiscussionMotionFragment, DiscussionProposalFragment, DiscussionReferendumFragment, DiscussionTreasuryProposalFragment } from './generated/discussion-db-graphql';

export interface OnchainSyncData {
    motions?: Array<OnchainMotionFragment | null> | null;
    proposals?: Array<OnchainProposalFragment | null> | null;
    referenda?: Array<OnchainReferendumFragment | null> | null;
    treasuryProposals?: Array<OnchainTreasuryProposalFragment | null> | null;
}

export interface DiscussionSyncData {
    motions?: Array<DiscussionMotionFragment | null> | null;
    proposals?: Array<DiscussionProposalFragment | null> | null;
    referenda?: Array<DiscussionReferendumFragment | null> | null;
    treasuryProposals?: Array<DiscussionTreasuryProposalFragment | null> | null;
}

export interface SyncData {
    discussion: DiscussionSyncData;
    onchain: OnchainSyncData;
}

export interface SyncMap {
    onchain: OnchainSyncMap;
    discussion: DiscussionSyncMap;
}

export interface OnchainSyncMap {
    motions?: MotionObjectMap;
    proposals?: ObjectMap;
    referenda?: ReferendumObjectMap;
    treasuryProposals?: ObjectMap;
}

export interface OnchainReferendaValueSyncType {
    preimageHash: string;
    blockCreationHash: string;
}

export interface OnchainMotionSyncType {
    author: string;
    treasuryProposalId?: number;
    section: string;
}

export interface DiscussionSyncMap {
    motions?: ObjectMap;
    proposals?: ObjectMap;
    referenda?: ObjectMap;
    treasuryProposals?: ObjectMap;
}

export type ObjectMap = {[index: string]: string};
export type MotionObjectMap = {[index: string]: OnchainMotionSyncType};
export type ReferendumObjectMap = {[index: string]: OnchainReferendaValueSyncType};
