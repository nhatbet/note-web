import Article from './repositories/Article'
import Auth from './repositories/Auth'
import Comment from './repositories/Comment'
import DeviceToken from './repositories/DeviceToken'
import Save from './repositories/Save'
import Selection from './repositories/Selection'
import User from './repositories/User'
import Notification from './repositories/Notification'

const Api = {
    auth: Auth(),
    article: Article(),
    user: User(),
    selection: Selection(),
    comment: Comment(),
    deviceToken: DeviceToken(),
    save: Save(),
    notification: Notification(),
}

// Make them available in the app with this.$api
// https://vuejs.org/v2/cookbook/adding-instance-properties.html
// Vue.$api = factories
export default Api
