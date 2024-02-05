/**
 * тип объекта данных клуба, получаемого из ZwiftAPI
 */
export interface ClubZwift {
  id: string;
  images: [
    {
      type: 'EVENT';
      imageUrl: string;
    },
    {
      type: 'CLUB_LARGE';
      imageUrl: string;
    },
    {
      type: 'THUMBNAIL';
      imageUrl: string;
    },
    {
      type: 'ICON';
      imageUrl: string;
    }
  ];
  memberCount: number;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  createdOn: string;
  modifiedOn: string;
  preferredLanguage: string;
  country: string;
  primaryColor: string;
  secondaryColor: string;
  sports: string[];
  allowComments: boolean;
  allowInvites: boolean;
  maxMemberLevel: number;
  jerseyHash: null;
  type: string;
  connections: unknown[];
  maxMembers: number;
  membership: {
    membershipId: string;
    clubId: string;
    profileId: number;
    status: string;
    securityLevel: string;
    createdOn: string;
    modifiedOn: string;
  };
  stats: unknown;
  restriction: {
    id: string;
    clubListingVisibility: string;
    clubDetailVisibility: string;
    clubAffiliationVisibility: string;
    clubDiscoveryVisibility: string;
    joinMethod: string;
    gender: string;
    achievementLevel: unknown;
    playerTypeIds: unknown[];
  };
  myActiveClub: boolean;
}
