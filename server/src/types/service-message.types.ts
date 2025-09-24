import { SERVICE_MESSAGE_TYPE } from '../assets/service-message';

/**
 * Типы сообщений внутри сайта.
 */
export type TServiceMessageType = (typeof SERVICE_MESSAGE_TYPE)[number];

export type TCreateMethodServiceMessageParams = {
  recipientUser: string;
  initiatorUser?: string;
  type: TServiceMessageType;
  title: string;
  text: string;
  url?: string;
};

export type TeamMessageType =
  | 'joinRequest'
  | 'memberLeft'
  | 'youKickedMember'
  | 'youWereKicked'
  | 'newMemberJoined'
  | 'requestApproved'
  | 'requestRejected';

export type TeamMessageParams = {
  joinRequest: { applicantName: string; teamName: string };
  requestApproved: { teamName: string };
  memberLeft: { memberName: string; teamName: string };
  youKickedMember: { memberName: string; teamName: string };
  youWereKicked: { memberName: string; teamName: string };
  newMemberJoined: { memberName: string; teamName: string };
  requestRejected: { teamName: string };
};

export type TeamMessageResult = {
  text: string;
  title: string;
};
