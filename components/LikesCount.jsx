const LikesCount = ({
    likesArray,

}) => {
    return (
        <>
            {
                likesArray.length === 1 ?
                    <p className="text-sm text-gray-500">{likesArray.length} like</p>
                    :
                    <p className="text-sm text-gray-500">{likesArray.length} likes</p>
            }

        </>

    )
};
export default LikesCount;
