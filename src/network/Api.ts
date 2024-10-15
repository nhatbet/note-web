import Article from './repositories/Article'
import Auth from './repositories/Auth'
import Comment from './repositories/Comment'
import DeviceToken from './repositories/DeviceToken'
import Selection from './repositories/Selection'
import User from './repositories/User'

const Api = {
    auth: Auth(),
    article: Article(),
    user: User(),
    selection: Selection(),
    comment: Comment(),
    deviceToken: DeviceToken()
}

// Make them available in the app with this.$api
// https://vuejs.org/v2/cookbook/adding-instance-properties.html
// Vue.$api = factories
export default Api
