[**server_dev**](../../README.md)

***

[server_dev](../../README.md) / [Team](../README.md) / TeamRepository

# Class: TeamRepository

Defined in: [Team.ts:7](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/Team.ts#L7)

## Constructors

### Constructor

> **new TeamRepository**(): `TeamRepository`

Defined in: [Team.ts:8](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/Team.ts#L8)

#### Returns

`TeamRepository`

## Methods

### getById()

> **getById**(`teamId`): `Promise`\<`TTeam` \| `null`\>

Defined in: [Team.ts:13](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/Team.ts#L13)

Данные команды.

#### Parameters

##### teamId

`string`

#### Returns

`Promise`\<`TTeam` \| `null`\>

***

### getByUrlSlug()

> **getByUrlSlug**(`urlSlug`): `Promise`\<`TTeam` \| `null`\>

Defined in: [Team.ts:20](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/Team.ts#L20)

Данные команды.

#### Parameters

##### urlSlug

`string`

#### Returns

`Promise`\<`TTeam` \| `null`\>

***

### getTeamsAppearance()

> **getTeamsAppearance**(): `Promise`\<`object`[]\>

Defined in: [Team.ts:27](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/Team.ts#L27)

данные по appearance у всех команд.

#### Returns

`Promise`\<`object`[]\>
