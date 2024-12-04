export const formatToClietnDate = (date?: Date) => {
    if(!date) {
        return ''
    }

    return new Date(date).toLocaleDateString()
}