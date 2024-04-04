import { Box, Container, Flex, Stack, Text } from '@chakra-ui/react'
import React from 'react'
import { IoLocation, IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io5'

const Footer = () => {
    return (
        <Box mt={'auto'} bg={'black'}>
            <Container maxW={'100vw'}>
                <Box minW={'40vw'} p={10}>
                    <Flex rowGap={10} flexDir={['column', 'column', 'column', 'row', 'row', 'row']} justifyContent={'space-between'} >
                        <Flex flexDir={['column', 'column', 'row', 'row', 'row', 'row']} gap={20}>
                            <Stack fontWeight={800} fontSize={15} color={'white'} gap={3}>
                                <Text cursor={'pointer'}>FIND A STORE</Text>
                                <Text cursor={'pointer'}>BECOME A MEMBER</Text>
                                <Text cursor={'pointer'}>Send Us Feedback</Text>
                                <Text cursor={'pointer'}>FIND A STORE</Text>
                                <Text cursor={'pointer'}>BECOME A MEMBER</Text>
                                <Text cursor={'pointer'}>Send Us Feedback</Text>
                            </Stack>

                            <Stack fontWeight={500} color={'#7e7e7e'}>
                                <Text color={'white'} fontSize={15} fontWeight={800} cursor={'pointer'}>HELP</Text>
                                <Text transition={'all 0.3s linear'} _hover={{ color: 'white' }} cursor={'pointer'}>Get Help</Text>
                                <Text transition={'all 0.3s linear'} _hover={{ color: 'white' }} cursor={'pointer'}>Order Status</Text>
                                <Text transition={'all 0.3s linear'} _hover={{ color: 'white' }} cursor={'pointer'}>Delivery</Text>
                                <Text transition={'all 0.3s linear'} _hover={{ color: 'white' }} cursor={'pointer'}>Returns</Text>
                                <Text transition={'all 0.3s linear'} _hover={{ color: 'white' }} cursor={'pointer'}>Payment Options</Text>
                                <Text transition={'all 0.3s linear'} _hover={{ color: 'white' }} cursor={'pointer'}>Contact Us</Text>
                            </Stack>

                            <Stack fontWeight={500} color={'#7e7e7e'}>
                                <Text transition={'all 0.3s linear'} _hover={{ color: 'white' }} color={'white'} fontSize={15} fontWeight={800} cursor={'pointer'}>About Nike</Text>
                                <Text transition={'all 0.3s linear'} _hover={{ color: 'white' }} cursor={'pointer'}>About Nike</Text>
                                <Text transition={'all 0.3s linear'} _hover={{ color: 'white' }} cursor={'pointer'}>News</Text>
                                <Text transition={'all 0.3s linear'} _hover={{ color: 'white' }} cursor={'pointer'}>Careers</Text>
                                <Text transition={'all 0.3s linear'} _hover={{ color: 'white' }} cursor={'pointer'}>Investors</Text>
                                <Text transition={'all 0.3s linear'} _hover={{ color: 'white' }} cursor={'pointer'}>Sustainability</Text>
                            </Stack>
                        </Flex>

                        <Flex gap={3}>
                            <Box cursor={'pointer'} >
                                <Box rounded={50} p={2} transition={'all 0.3s linear'} bg={'gray'} _hover={{ bg: 'white' }}>
                                    <IoLogoTwitter />
                                </Box>
                            </Box>

                            <Box cursor={'pointer'}>
                                <Box rounded={50} p={2} transition={'all 0.3s linear'} bg={'gray'} _hover={{ bg: 'white' }}>
                                    <IoLogoFacebook />
                                </Box>
                            </Box>

                            <Box cursor={'pointer'}>
                                <Box rounded={50} p={2} transition={'all 0.3s linear'} bg={'gray'} _hover={{ bg: 'white' }} >
                                    <IoLogoInstagram />
                                </Box>
                            </Box>

                            <Box cursor={'pointer'}>
                                <Box rounded={50} p={2} transition={'all 0.3s linear'} bg={'gray'} _hover={{ bg: 'white' }}>
                                    <IoLogoYoutube />
                                </Box>
                            </Box>
                        </Flex>
                    </Flex>

                    <Flex mt={10} gap={10}>
                        <Box cursor={'pointer'} color={'white'}>
                            <Box display={'inline-block'} mr={2} >
                                <IoLocation />
                            </Box>
                            <Text fontWeight={600} display={'inline-block'}>
                                Vietnam
                            </Text>
                        </Box>

                        <Box color={'white'}>
                            <Text>
                                © 2024 Nike, Inc. All rights reserved
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer