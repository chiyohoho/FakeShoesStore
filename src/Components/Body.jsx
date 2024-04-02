import { Box, Container, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState, useRef, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';


const Body = () => {
    const navigate = useNavigate()
    const { dataAPI, setDataAPI, idProduct, setIdProduct } = useContext(AppContext)

    useEffect(() => {
        axios.get('https://6516d0e109e3260018ca59a0.mockapi.io/Api-pha-ke')
            .then(res => {
                setDataAPI(res.data)
                const data = localStorage.setItem('PRODUCT_DATA', JSON.stringify(res.data))
            })
    }, [])

    const handleRedirect = (item) => {
        setIdProduct(item.id)
        const id = localStorage.setItem('PRODUCT_ID', JSON.stringify(item.id))
        navigate(`/Detail`)
    }

    const [isSticky, setIsSticky] = useState(false);
    const imageRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const firstEntry = entries[0];
                setIsSticky(firstEntry.isIntersecting);
            },
            {
                threshold: [0],
            }
        );

        observer.observe(imageRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <Box mt={20}>
            <Container maxW={'95vw'}>
                <Flex
                    position={isSticky ? 'sticky' : 'static'}
                    top={0}
                    bg={'white'}
                    width={'100%'}
                    py={5}
                    justifyContent={'center'}
                    zIndex={isSticky ? 'sticky' : 'auto'}
                    _before={{
                        pos: 'absolute',
                        content: '"Men"',
                        top: 5,
                        left: 0,
                        fontSize: 24,
                        fontWeight: 500,
                    }}
                >


                    <Box display={['none', 'none', 'block', 'block', 'block']}>
                        <Flex fontSize={20} fontWeight={'450'} gap={10}>
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
                </Flex>

                <Box ref={imageRef} >
                    <Image src='https://static.nike.com/a/images/f_auto/dpr_2.0,cs_srgb/w_1824,c_limit/9813ed90-ca3b-4830-a549-cecae1d67e0b/men-s-shoes-clothing-accessories.png' alt='main' />
                </Box>

                <Box my={20}>
                    <Text mb={10} fontSize={22} fontWeight={'semibold'}>Trending</Text>

                    <Grid templateColumns={{ '2xl': 'repeat(4, 1fr)', xl: 'repeat(3, 1fr)', lg: 'repeat(3, 1fr)', md: 'repeat(2, 1fr)' }} gap={[10, 10, 2, 2, 2]} >
                        {dataAPI.map((item, index) => {
                            const dataSizes = item.sizes
                            return (
                                <GridItem key={item.id} className='card_item' onClick={() => handleRedirect(item)} cursor={'pointer'} mb={5} maxW={'100%'}>
                                    <Box mb={2} bg={'#f6f6f6'}>
                                        <Image className='card_image' src={item.image} alt={item.name} />
                                    </Box>
                                    <Text fontSize={20} fontWeight={'semibold'}>{item.name}</Text>
                                    <Text mb={2} color={'gray'} fontStyle={'italic'}>{item.category}</Text>
                                    <Flex mb={2} gap={2}>
                                        {dataSizes.map((item, index) => {
                                            return (
                                                <Box key={index} _hover={{ border: '1px solid black', transition: 'all 0.3s linear' }} fontWeight={600} display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={12} textAlign={'center'} w={'40px'} height={'40px'} overflow={'hidden'} border={'1px solid #ccc'}>
                                                    {item}
                                                </Box>
                                            )
                                        })}
                                    </Flex>
                                    <Text fontWeight={500}>{(item.price * 24500).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Text>
                                </GridItem>
                            )
                        })}

                    </Grid>
                </Box>
            </Container>
        </Box>
    )
}

export default Body