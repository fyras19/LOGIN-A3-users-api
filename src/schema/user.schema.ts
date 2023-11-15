import S from 'fluent-json-schema'

export const userCreateSchema = {
    body: S.object()
        .prop('name', S.string().required()),
    queryString: S.object(),
    params: S.object(),
    Headers: S.object()
}

export const userUpdateSchema = {
    body: S.object()
        .prop('name', S.string())
        .prop('score', S.number()),
    queryString: S.object(),
    params: S.object()
        .prop('userId', S.string().required()),
    Headers: S.object()
}