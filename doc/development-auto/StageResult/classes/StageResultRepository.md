[**server_dev**](../../README.md)

***

[server_dev](../../README.md) / [StageResult](../README.md) / StageResultRepository

# Class: StageResultRepository

Defined in: [StageResult.ts:7](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/StageResult.ts#L7)

## Constructors

### Constructor

> **new StageResultRepository**(): `StageResultRepository`

#### Returns

`StageResultRepository`

## Methods

### changeRiderCategoryInStages()

> **changeRiderCategoryInStages**(`resultIds`, `modifiedCategory`): `Promise`\<`void`\>

Defined in: [StageResult.ts:38](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/StageResult.ts#L38)

Запрос для RiderCategoryRuleProcessor.handleRecalculationAll
Изменение категории у райдера во всех завершенных этапах серии.

#### Parameters

##### resultIds

`string`[]

##### modifiedCategory

###### moderator

`string` \| `undefined`

###### modifiedAt

`Date`

###### reason

`string`

###### value

`"A"` \| `"B"` \| `"C"` \| `"D"` \| `"E"` \| `"APlus"` \| `"BPlus"` \| `"WA"` \| `"WB"` \| `"WC"` \| `"WD"` \| `null`

#### Returns

`Promise`\<`void`\>

***

### getAllStageResultsBySeriesId()

> **getAllStageResultsBySeriesId**(`_id`): `Promise`\<`TStageResult`[]\>

Defined in: [StageResult.ts:67](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/StageResult.ts#L67)

Получение результатов всех этапов серии по _id.

#### Parameters

##### \_id

`string`

#### Returns

`Promise`\<`TStageResult`[]\>

***

### getIdAndStageOrderFromAllStages()

> **getIdAndStageOrderFromAllStages**(`zwiftId`): `Promise`\<`object`[]\>

Defined in: [StageResult.ts:26](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/StageResult.ts#L26)

Запрос для RiderCategoryRuleProcessor.getAllRiderResults
Данные из всех этапов _id, order.

#### Parameters

##### zwiftId

`number`

#### Returns

`Promise`\<`object`[]\>

***

### getStageResultById()

> **getStageResultById**(`_id`): `Promise`\<`TStageResult` \| `null`\>

Defined in: [StageResult.ts:61](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/StageResult.ts#L61)

Получение результата райдера на этапе серии по _id.

#### Parameters

##### \_id

`string`

#### Returns

`Promise`\<`TStageResult` \| `null`\>

***

### getZwiftIdAndStageOrder()

> **getZwiftIdAndStageOrder**(`id`): `Promise`\<\{ `order`: `number`; `profileId`: `number`; \} \| `null`\>

Defined in: [StageResult.ts:12](https://github.com/caH40/zwiftpower/blob/5fffec92fb890f2c9fb8c4956cd7f708cc1e00f5/server/src/repositories/StageResult.ts#L12)

Запрос для RiderCategoryRuleProcessor.getAllRiderResults
Данные об zwiftId райдера и о номере этапа.

#### Parameters

##### id

`string`

#### Returns

`Promise`\<\{ `order`: `number`; `profileId`: `number`; \} \| `null`\>
