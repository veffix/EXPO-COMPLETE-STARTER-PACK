import React, {useEffect, useState, useCallback, useMemo} from 'react';
import {getContacts, addContact, deleteContact} from '@/service/contacts';
import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';
import { HStack } from "@/components/ui/hstack"
import { Input, InputField } from '@/components/ui/input';
import { StyleSheet, View, ScrollView } from 'react-native';
import { useForm, Controller, set } from 'react-hook-form';
import { z } from 'zod';
import { Keyboard } from 'react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import debounce from 'lodash.debounce';
import { useToast, Toast } from "@/components/ui/toast"
import { Center } from '@/components/ui/center';

import {
    Table,
    TableHeader,
    TableFooter,
    TableBody,
    TableHead,
    TableData,
    TableRow,
    TableCaption,
  } from "@/components/ui/table"

const Contacts = () => {    
    const [contacts, setContacts] = useState([]); // [1
    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [search, setSearch] = useState('');
    const [searchApi, setSearchApi] = useState('');
    const [pagination, setPagination] = useState({totalPage: 1, limit: 5});
    const [page, setPage] = useState(1);
console.log('page', page)
    const handleSearchApi = useCallback(debounce((searchProps) => {
        console.log('searchProps', searchProps);
        setSearchApi(searchProps);
    }, 500), []);

    const getCallApi = useCallback(() => {  getContacts({firstname: searchApi, page: page}).then((data) => {setContacts(data?.data?.contacts); setPagination(data.data.pagination)});}, [page, searchApi]);

    useEffect(() => {
      setPage(1)
    }, [searchApi]);  

    useEffect(() => {
      if(page > pagination.totalPage && pagination.totalPage > 0) setPage(pagination.totalPage)
    }, [page, pagination.totalPage]);

    useEffect(() => {
      getCallApi()
    }, [searchApi, page]);

    const onSubmit = () => {
        addContact({email: email, firstname: firstname}).then((data) => {
          getCallApi()
            setEmail('');
            setFirstname('');
        });
    }

    const handleDelete = (id) => {  
        deleteContact({id: id}).then(() => {
          getCallApi()
            
        });
    }
    console.log('contacts', contacts);
    return (
        <Center className="w-full">
       <ScrollView className='max-w-[1100px] w-full'>
       
            <Heading className="mt-10 text-center">Liste des contacts</Heading>
            
<Center>
                            <HStack className='w-full flex-col' space="md" reversed={false}>
                            <Input className='w-[250px]' variant='underlined'>
                <InputField
               
                  placeholder="Recherche par prénom"
                  type="text"
                  value={search}
                  onChangeText={(e) => {setSearch(e); handleSearchApi(e)}}
                  returnKeyType="done"
                  className="text-sm"
                />
              </Input>

              <Box className="rounded-lg overflow-hidden">
                            <Table className="w-full margin-auto">
  <TableHeader>
    <TableRow>
      <TableHead>Prénom</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Delete</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
  {contacts.map((contact) => (
    <TableRow key={contact?._id}>
      <TableData><Text>{contact.firstname}</Text></TableData>
      <TableData><Text>{contact.email}</Text></TableData>
      <TableData><Text onPress={() => handleDelete(contact._id)}>Delete</Text></TableData>
    </TableRow>
      ))}
    </TableBody>
  <TableFooter>
    <TableRow>
    {contacts.length === 0 && !searchApi && <><TableHead><Text>Aucun contact</Text></TableHead><TableHead></TableHead><TableHead></TableHead></>}
            {contacts.length === 0 && searchApi && <><TableHead ><Text>aucun resultat pour votre recherche</Text></TableHead><TableHead></TableHead></>}
    </TableRow>
  </TableFooter>
</Table>
</Box>
<Center>

<HStack space="md">

{pagination.totalPage > 1 && (
  Array.from({ length: pagination.totalPage }, (_, i) => (
    <Button className={page === i + 1 ? 'bg-background-900' : 'bg-background-300'} key={i} onPress={() => setPage(i + 1)} >
     <ButtonText> {i + 1}</ButtonText>
    </Button>
  ))
)}
</HStack>
</Center>



                        
            </HStack>
         
            <Box className='mt-[34px] max-w-[400px] w-full'>
            <Heading className="text-center">Créer un contact</Heading>
            <Input className='mt-5'>
                <InputField
                  placeholder="Prénom"
                  type="text"
                  value={firstname}
                  onChangeText={(e) => setFirstname(e)}
                  returnKeyType="done"
                  className="text-sm"
                />
              </Input>
            <Input className='mt-2'>
                <InputField
                  placeholder="Email"
                  type="text"
                  value={email}
                  onChangeText={(e) => setEmail(e)}
                  returnKeyType="done"
                  className="text-sm"
                />
              </Input>
     
    
              <Box className='flex-1 items-end'>

           <Button
        variant="solid"
        size="md"
        action="primary"
        onPress={() => onSubmit()}
        className="w-[80px] mt-5"
      >
        <ButtonText>Créer</ButtonText>
      </Button>
              </Box>
            </Box>
            </Center>
        </ScrollView>
            </Center>

    
    );
}

export default Contacts;