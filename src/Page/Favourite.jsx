import { Box, Button, Container, Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react'
import React, { useContext, useEffect, useState } from 'react'
import { GoHeart, GoHeartFill } from "react-icons/go";
import { AppContext } from '../Context/AppContext'
import ModalSelectSize from '../ComponentUI/ModalSelectSize';
import { useNavigate } from 'react-router-dom';

const Favourite = () => {
    const { favList, setFavList } = useContext(AppContext)
    const [isEdit, setIsEdit] = useState(false)
    const [productAddToBag, setProductAddToBag] = useState({})
    const navigate = useNavigate();

    const handleDirect = () => {
        navigate('/')
    }

    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    console.log('check scrollY:', scrollY)

    const handleMoveToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }


    const handleChangeFavourite = (itemID) => {
        const newFavList = favList.map(item => {
            if (item.id === itemID) {
                return { ...item, isFavourite: !item.isFavourite }
            }
            return item
        })
        setFavList(newFavList)
    }

    const handleSaveChangeFavourite = () => {
        const newFavListAfterSaveChange = favList.filter(item => item.isFavourite)
        setFavList(newFavListAfterSaveChange)
        setIsEdit(false)
    }


    return (
        <Box>
            <Container my={70} maxW={'95vw'}>
                <Box>
                    <Box pos={'fixed'} zIndex={10} right={20} bottom={20} display={scrollY > 300 ? 'block' : 'none'}>
                        <Button onClick={handleMoveToTop} colorScheme='teal' variant='outline'>
                            Move to Top
                        </Button>
                    </Box>
                    <Flex alignItems={'center'} justifyContent={'space-between'} >
                        <Box>
                            <Text fontSize={24}>
                                {isEdit ? 'Edit Favourites' : 'Favourites'}
                            </Text>
                        </Box>

                        <Box display={favList.length > 0 ? 'block' : 'none'} >
                            <Box display={isEdit ? 'none' : 'block'}>
                                <Button onClick={() => setIsEdit(true)} border={'1px solid #ccc'} _hover={{ border: '1px solid black' }} rounded={15} p={6} variant={'outline'}>Edit</Button>
                            </Box>
                            <Box display={isEdit ? 'block' : 'none'}>
                                <Button bg={'black'} color={'white'} onClick={() => handleSaveChangeFavourite()} border={'1px solid #ccc'} _hover={{ border: '1px solid black' }} rounded={15} p={6} variant={'outline'}>Done</Button>
                            </Box>
                        </Box>
                    </Flex>

                    {favList.length === 0 ?
                        <Box mt={50}>
                            <Flex alignItems={'center'} justifyContent={'center'} flexDir={'column'}>
                                <Text fontSize={50} fontWeight={500}>Danh sách yêu thích hiện đang trống</Text>
                                <Text color={'tomato'} cursor={'pointer'} onClick={() => handleDirect()}>Bấm vào đây để tìm kiếm sản phẩm</Text>
                            </Flex>
                        </Box>
                        :
                        <Grid mt={12} rowGap={10} templateColumns='repeat(3, 1fr)' gap={10}>
                            {favList.map((item, index) => {
                                return (
                                    <GridItem key={item.id} w='100%' pos={'relative'}>
                                        <Box>
                                            <Image src={item.image} alt={item.name} />
                                        </Box>
                                        <Flex justifyContent={'space-between'} mt={5}>
                                            <Box>
                                                <Text fontSize={20} fontWeight={500}>{item.name}</Text>
                                                <Text fontSize={17} fontStyle={'italic'}>{item.category}</Text>
                                            </Box>
                                            <Text fontSize={18} fontWeight={500}>{(item.price * 24500).toLocaleString('vi', { style: 'currency', currency: 'VND' })}</Text>
                                        </Flex>

                                        <ModalSelectSize item={item} productAddToBag={productAddToBag} setProductAddToBag={setProductAddToBag} />

                                        <Box onClick={() => handleChangeFavourite(item.id)} pos={'absolute'} top={0} right={0} m={10} display={isEdit ? 'block' : 'none'} >
                                            <Box fontSize={36} rounded={50} display={'inline-block'} p={2}>
                                                {item.isFavourite ? <GoHeartFill /> : <GoHeart />}
                                            </Box>
                                        </Box>

                                    </GridItem>
                                )
                            })}
                        </Grid>
                    }


                </Box>
            </Container>
        </Box>
    )
}

export default Favourite