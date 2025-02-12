"use client"

import React, { useEffect } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Switch } from '@/components/ui/switch'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import useFetch from '@/hooks/useFetch'
import { updateDefaultAccount } from '@/actions/accounts'
import { toast } from 'sonner'


const AccountCard = ({account}) => {
    const {name,type,balance,id,isDefault} = account

    const {
        loading: updateDefaultLoading,
        error,
        fn: updateDefaultFn,
        data:updatedAccount
    } = useFetch(updateDefaultAccount)

    const handleDefaultChange = async (event) => {
        event.preventDefault()
        if(isDefault){
            toast.warning("You need atleast 1 default account")
            return // dont allow toggling off the default account
        }
        await updateDefaultFn(id)

    }

    useEffect(() => {
        if(updatedAccount?.success){
            toast.success("Default account updated successfully")
        }
    },[updatedAccount,updateDefaultLoading])

    useEffect(() => {
        if(error){
            toast.error(error.message || "Failed to update default account") 
        }
    },[error])
  return (
    <Card className='hover:shadow-md transition-shadow group relative gradient text-white'>
        <Link href={`/account/${id}`}>
    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
        <CardTitle className='text-sm font-medium capitalize'>{name}</CardTitle>
        <Switch checked={isDefault} onClick={handleDefaultChange} disabled={updateDefaultLoading} />
    </CardHeader>
    <CardContent>
        <div className='text-2xl font-bold'>
            ${parseFloat(balance).toFixed(2)}
        </div>
        <p className='text-xs  text-black'>
            {type.charAt(0) + type.slice(1).toLowerCase()} Account
        </p>
    </CardContent>
    <CardFooter className='flex justify-between text-sm text-muted-foreground'>
    <div className="flex items-center text-black">
            <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
            Income
          </div>
          <div className="flex items-center text-black">
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
            Expense
          </div>
    </CardFooter>
    </Link>
    </Card>
  )
}

export default AccountCard
