import {useContext} from 'react'
import {useRouter} from 'next/router'
import {useMutation} from 'react-apollo'

import {ModalContext} from 'providers/ModalProvider'
import {AuthContext} from 'providers/AuthenticationProvider'
import {CreateAquascapeMutation} from 'graphql/generated/mutations'
import {CREATE_AQUASCAPE} from 'graphql/mutations'
import routes, {createDynamicPath} from 'routes'
import config from 'config'
import logger from 'services/logger'

const useCreateAquascape = () => {
    const {openModal} = useContext(ModalContext)
    const router = useRouter()
    const {isAuthenticated} = useContext(AuthContext)
    const [createAquascapeMutation] = useMutation<CreateAquascapeMutation>(CREATE_AQUASCAPE)

    const onCreateAquascape = () => {
        if (!isAuthenticated) {
            openModal('register')
            return
        }

        createAquascapeMutation()
            .then(result => {
                const id = result.data?.createAquascape.id
                if (!id) return

                router.push(
                    createDynamicPath(routes.aquascapeDetailsEdit, {
                        id: id.toString(),
                        title: config.EDIT_AQUASCAPE_URL_TITLE_PLACEHOLDER,
                    })
                )
            })
            .catch(err => logger.error(err))
    }

    return onCreateAquascape
}

export default useCreateAquascape
