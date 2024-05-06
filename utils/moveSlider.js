export const moveRight = ({countSlice, setCountSlice, array}) => {
    if (countSlice.end < array.length) {
        setCountSlice({start: countSlice.start + 1, end: countSlice.end + 1})
    }
}

export const moveLeft = ({countSlice, setCountSlice}) => {
    if (countSlice.start !== 0) {
        setCountSlice({start: countSlice.start - 1, end: countSlice.end - 1})
    }
}