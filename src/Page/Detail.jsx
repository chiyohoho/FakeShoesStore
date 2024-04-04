import React, { useContext, useEffect, useState } from 'react'
import { Box, Button, Container, Flex, Grid, GridItem, Image, Stack, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import { AppContext } from '../Context/AppContext';

const Detail = () => {
    const navigate = useNavigate();
    const { idProduct, dataAPI, showToast, bagList, setBagList, favList, setFavList, isLogin, userData, setUserData } = useContext(AppContext)
    const [productAddToBag, setProductAddToBag] = useState({})
    const dataAPINew = JSON.parse(localStorage.getItem('PRODUCT_DATA')) || dataAPI
    const [idData, setidData] = useState(String(JSON.parse(localStorage.getItem('PRODUCT_ID')) || String(idProduct)))
    const productShow = dataAPINew.find(item => item.id === idData)
    const similarProductsList = dataAPINew.filter(item => productShow.similarProducts.includes(item.id))

    const [selectSize, setSelectSize] = useState(() => {
        return productShow.sizes.map(() => false)
    })

    const checkActive = (index, item) => {
        const newSizeState = productShow.sizes.map(() => false)
        newSizeState[index] = true
        setSelectSize(newSizeState)
        setProductAddToBag({ ...productShow, sizePicked: item, amount: 1 })
    }

    const handleAddToBag = () => {
        if (isLogin) {
            if (productAddToBag.sizes === undefined) {
                showToast('Không thể thêm vào giỏ hàng', 'Vui lòng chọn 1 size trước rồi thử lại', 'warning')
            } else {
                const newCart = [...userData.cart, productAddToBag]
                showToast('Thành công thêm vào giỏ hàng', '', 'success')
                setBagList(prev => ([...prev, productAddToBag]))
                setUserData(prev => ({ ...prev, cart: newCart }))
            }
        } else {
            showToast('Cảnh báo!', 'Vui lòng đăng nhập trước và thử lại', 'warning')
        }
    }

    const handleAddToFavourite = () => {
        const checkFavList = favList.some(item => item.id === productShow.id)

        if (isLogin) {
            if (!checkFavList) {
                productShow.isFavourite = true
                showToast('Đã thêm sản phẩm vào danh sách yêu thích', '', 'success')
                setFavList(prev => ([...prev, productShow]))
            } else {
                showToast('Sản phẩm này đã có trong danh sách yêu thích', '', 'warning')
            }
        } else {
            showToast('Cảnh báo!', 'Vui lòng đăng nhập trước và thử lại', 'warning')
        }
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
        })
    }, [])

    const handleRedirectProduct = (item) => {
        setidData(item.id)
        setProductAddToBag({})
        const newSizeState = productShow.sizes.map(() => false);
        setSelectSize(newSizeState);
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }

    return (
        <Box mt={50}>
            <Container maxW={'70vw'}>
                {<Box>
                    {productShow ?
                        <Grid templateColumns={['repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(1, 1fr)', 'repeat(2, 1fr)']} m={'0 auto'} w={'100%'} justifyContent={'center'}>
                            <Box bg={'#f6f6f6'} minW={450}>
                                <Image minWidth={'100%'} src={productShow.image} alt='shoes' />
                            </Box>

                            <Box px={10} minW={450}>
                                <Box>
                                    <Box >
                                        <Text fontWeight={600} fontSize={26}>{productShow.name}</Text>
                                        <Text mb={4} color={'gray'} fontStyle={'italic'} fontSize={16}>{productShow.category}</Text>

                                        <Text fontWeight={600} fontSize={22}>{(productShow.price * 24500).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Text>
                                    </Box>

                                    <Box mt={10}>
                                        <Flex fontSize={17} fontWeight={500} alignItems={'center'} justifyContent={'space-between'}>
                                            <Text>Select Size</Text>
                                            <Text color={'gray'}>Size Guide</Text>
                                        </Flex>

                                        <Grid mt={2} templateColumns='repeat(3, 1fr)' gap={1}>
                                            {productShow.sizes.map((item, index) => {
                                                return (
                                                    <Box cursor={'pointer'} key={index}
                                                        _hover={{ border: '1px solid black', transition: 'all 0.3s linear' }}
                                                        rounded={5} w={'100%'} px={8} py={2}
                                                        border={selectSize[index] ? '1px solid black' : '1px solid #ccc'}
                                                        onClick={() => checkActive(index, item)}>
                                                        <Text textAlign={'center'} fontWeight={500}>
                                                            {item}
                                                        </Text>
                                                    </Box>
                                                )
                                            })}
                                        </Grid>

                                        <Box>
                                            <Button onClick={handleAddToBag} _hover={{ bg: '#707072' }} color={'white'} bg={'black'} py={8} rounded={50} mt={10} w={'100%'}>
                                                Add to Bag
                                            </Button>

                                            <Button onClick={handleAddToFavourite} _hover={{ border: '1px solid black' }} border={'1px solid #ccc'} color={'black'} bg={'white'} py={8} rounded={50} mt={5} w={'100%'}>
                                                <Text>Favourite</Text>
                                                <Box ml={2} fontSize={24}>
                                                    <CiHeart />
                                                </Box>
                                            </Button>
                                        </Box>

                                        <Box mt={5}>
                                            <Text fontSize={16} fontWeight={'semibold'}>
                                                {productShow.description}
                                            </Text>
                                        </Box>

                                    </Box>
                                </Box>
                            </Box>
                        </Grid>

                        :
                        <Stack>
                            <Skeleton height='100px' />
                            <Skeleton height='100px' />
                            <Skeleton height='100px' />
                        </Stack>
                    }
                </Box>}

                <Box my={20}>
                    <Text mb={10} fontSize={22} fontWeight={'semibold'}>Similar Products</Text>

                    <Grid templateColumns={{ '2xl': 'repeat(3, 1fr)', xl: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)', md: 'repeat(1, 1fr)' }} gap={{ '2xl': 3, xl: 5, lg: 7, md: 10, base: 15 }} >
                        {similarProductsList.map((item) => {
                            return (
                                <GridItem key={item.id} onClick={() => handleRedirectProduct(item)} className='card_item' cursor={'pointer'} mb={5} maxW={'100%'}>
                                    <Box mb={2} bg={'#f6f6f6'}>
                                        <Image className='card_image' src={item.image} alt={item.name} />
                                    </Box>
                                    <Text fontSize={20} fontWeight={'semibold'}>{item.name}</Text>
                                    <Text mb={2} color={'gray'} fontStyle={'italic'}>{item.category}</Text>
                                    <Flex mb={2} gap={2}>
                                        {item.sizes.map((item, index) => {
                                            return (
                                                <Box key={index} fontWeight={600}
                                                    display={'flex'} alignItems={'center'} justifyContent={'center'} fontSize={12}
                                                    textAlign={'center'} w={'40px'} height={'40px'} overflow={'hidden'}
                                                    border={'1px solid #ccc'} _hover={{ border: '1px solid black' }} transition={'all 0.3s linear'}>
                                                    {item}
                                                </Box>
                                            )
                                        })}
                                    </Flex>
                                    <Text fontWeight={500}>{(item.price * 24500).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Text>
                                </GridItem>
                            )
                        })
                        }
                    </Grid>
                </Box>
            </Container>
        </Box >
    )
}

export default Detail