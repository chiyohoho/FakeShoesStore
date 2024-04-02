import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const nagiviator = useNavigate()

    setTimeout(() => {
        const confirm = window.confirm('Bấm OK để quay về')
        if (confirm) {
            return nagiviator('/')
        } else {
            return nagiviator('/')
        }
    }, 2000)



    return (
        <Box>
            <Text textAlign={'center'} fontSize={40} fontWeight={600}>Chưa có code xong</Text>
            <Box height={'100vh'} width={'100%'} backgroundImage={'https://i.pinimg.com/originals/6b/a5/7b/6ba57b38dc520300daeeda7ca9431527.gif'}>
            </Box>
        </Box>
    )
}

export default Profile