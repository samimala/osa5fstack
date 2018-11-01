let token=null

const blogs = [
    {
        id: "234242323424234242",
        title: "title 1",
        url: "url 1",
        author: "author 1",
        likes: 5,
        user: {
            _id: "111111111111111111",
            username: "username 1",
            name: "name 1"
        }
    },
    {
        id: "534242323424234242",
        title: "title 5",
        url: "url 5",
        author: "author 5",
        likes: 10,
        user: {
            _id: "211111111111111111",
            username: "username 2",
            name: "name 2"
        }
    },
    {
        id: "234242323424234242",
        title: "title 2",
        url: "url 2",
        author: "author 2",
        likes: 6,
        user: {
            _id: "211111111111111111",
            username: "username 2",
            name: "name 2"
        }
    },
    {
        id: "334242323424234242",
        title: "title 3",
        url: "url 3",
        author: "author 3",
        likes: 7,
        user: {
            _id: "311111111111111111",
            username: "username 3",
            name: "name 3"
        }
    },
    {
        id: "434242323424234242",
        title: "title 4",
        url: "url 4",
        author: "author 4",
        likes: 8,
        user: {
            _id: "111111111111111111",
            username: "username 1",
            name: "name 1"
        }
    }
]

const getAll = () => {
    return Promise.resolve(blogs)
}

export default { getAll, blogs }