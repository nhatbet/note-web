import Api from '@/network/Api'
import { getFCMToken } from '@/firebase'

export const deviceTokenService = () => {
    const saveFCMToken = async () => {
        const token = await getFCMToken()
        if (token) {
            // Gửi token này đến API lưu trữ
            await Api.deviceToken
                .store({ token: token })
                .then((res: any) => {
                    console.log('save token: ', res)
                })
                .catch((err: any) => {
                    console.log(err)
                })
        }
    }

    return { saveFCMToken }
}
