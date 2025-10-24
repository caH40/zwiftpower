[**server_dev**](../../README.md)

***

[server_dev](../../README.md) / [TeamMember](../README.md) / TeamMemberRepository

# Class: TeamMemberRepository

Defined in: [TeamMember.ts:14](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/TeamMember.ts#L14)

## Constructors

### Constructor

> **new TeamMemberRepository**(): `TeamMemberRepository`

#### Returns

`TeamMemberRepository`

## Methods

### getTeamMemberData()

> **getTeamMemberData**(`teamId`): `Promise`\<`TPopulatedTeamMember`[]\>

Defined in: [TeamMember.ts:19](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/TeamMember.ts#L19)

Запрос для Team.getStatistics
Данные об участниках команды.

#### Parameters

##### teamId

`string`

#### Returns

`Promise`\<`TPopulatedTeamMember`[]\>

***

### getUserAndZwiftIds()

> **getUserAndZwiftIds**(`teamId`): `Promise`\<`object`[]\>

Defined in: [TeamMember.ts:35](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/TeamMember.ts#L35)

Получение массива данных участника команды {_id,zwiftId}

#### Parameters

##### teamId

`string`

#### Returns

`Promise`\<`object`[]\>
