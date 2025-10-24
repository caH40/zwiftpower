[**server_dev**](../../README.md)

***

[server_dev](../../README.md) / [Event](../README.md) / EventRepository

# Class: EventRepository

Defined in: [Event.ts:7](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/Event.ts#L7)

Класс работы с коллекцией ZwiftEvent в MongoDB.

## Constructors

### Constructor

> **new EventRepository**(): `EventRepository`

#### Returns

`EventRepository`

## Methods

### getEventIds()

> **getEventIds**(`subgroupsIds`): `Promise`\<[`GetEventIdsReturn`](../type-aliases/GetEventIdsReturn.md)\>

Defined in: [Event.ts:12](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/Event.ts#L12)

Все Эвенты в которых есть подгруппы subgroupsId

#### Parameters

##### subgroupsIds

`ObjectId`[]

массив _id подгрупп эвента из БД.

#### Returns

`Promise`\<[`GetEventIdsReturn`](../type-aliases/GetEventIdsReturn.md)\>
