import { Box, Container, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';


const Body = () => {
    const navigate = useNavigate()
    const { dataAPI, setDataAPI, setIdProduct, } = useContext(AppContext)

    useEffect(() => {
        axios.get('https://6516d0e109e3260018ca59a0.mockapi.io/Api-pha-ke')
            .then(res => {
                setDataAPI(res.data)
                localStorage.setItem('PRODUCT_DATA', JSON.stringify(res.data))
            })
    }, [])

    const handleRedirect = (item) => {
        setIdProduct(item.id)
        localStorage.setItem('PRODUCT_ID', JSON.stringify(item.id))
        navigate(`/Detail`)
    }

    return (
        <Box mt={[0, 0, 0, 10, 15, 20]} >
            <Container maxW={'95vw'}>
                <Flex
                    bg={'white'}
                    width={'100%'}
                    py={5}
                    justifyContent={'space-between'}

                >
                    <Text w={'30%'} fontSize={20} fontWeight={'450'} >Men</Text>


                    <Box w={'100%'} display={['none', 'none', 'block', 'block', 'block']}>
                        <Flex fontSize={20} fontWeight={'450'} gap={10} justifyContent={'center'} >
                            <Text>
                                Shoes
                            </Text>

                            <Text>
                                Clothing
                            </Text>

                            <Text>
                                Gear
                            </Text>
                        </Flex>
                    </Box>

                    <Box w={'30%'} >

                    </Box>
                </Flex>

                <Box  >
                    <Image w={'100%'} src='https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1824,c_limit/9813ed90-ca3b-4830-a549-cecae1d67e0b/men-s-shoes-clothing-accessories.png' alt='main' />
                </Box>

                <Box pt={[3, 4, 5, 6, 7, 8]}>
                    <Text mb={10} fontSize={22} fontWeight={'semibold'}>Trending</Text>

                    <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)', 'repeat(4, 1fr)']} gap={2} mt={2}>
                        {dataAPI.map((item, index) => {
                            const dataSizes = item.sizes
                            return (
                                <Box key={item.id} className='card_item' onClick={() => handleRedirect(item)} cursor={'pointer'} mb={5} w={'100%'}>
                                    <Box w={'100%'} mb={2} bg={'#f6f6f6'}>
                                        <Image className='card_image' src={item.image} alt={item.name} />
                                    </Box>

                                    <Text fontSize={20} fontWeight={'semibold'}>{item.name}</Text>
                                    <Text mb={2} color={'gray'} fontStyle={'italic'}>{item.category}</Text>

                                    <Flex mb={2} gap={2}>
                                        {dataSizes.map((item, index) => {
                                            return (
                                                <Box key={index} _hover={{ border: '1px solid black', transition: 'all 0.3s linear' }}
                                                    fontWeight={600} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={12}
                                                    textAlign={'center'} w={'40px'} height={'40px'} overflow={'hidden'} border={'1px solid #ccc'}>
                                                    {item}
                                                </Box>
                                            )
                                        })}
                                    </Flex>
                                    <Text fontWeight={500}>{(item.price * 24500).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Text>
                                </Box>
                            )
                        })}

                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

export default Body