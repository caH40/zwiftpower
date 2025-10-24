[**server_dev**](../../README.md)

***

[server_dev](../../README.md) / [Series](../README.md) / SeriesRepository

# Class: SeriesRepository

Defined in: [Series.ts:6](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/Series.ts#L6)

## Constructors

### Constructor

> **new SeriesRepository**(): `SeriesRepository`

#### Returns

`SeriesRepository`

## Methods

### getStageIds()

> **getStageIds**(`seriesId`): `Promise`\<`Pick`\<`TSeries`, `"stages"` \| `"name"`\> \| `null`\>

Defined in: [Series.ts:11](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/Series.ts#L11)

Для TourGCManager.update.
По seriesId получение данных name,stages.

#### Parameters

##### seriesId

`string`

#### Returns

`Promise`\<`Pick`\<`TSeries`, `"stages"` \| `"name"`\> \| `null`\>
