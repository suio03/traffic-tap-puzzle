'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useFieldArray, useForm } from 'react-hook-form'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { BasicInfoSection } from './form-sections/BasicInfo'
import { MetadataSection } from './form-sections/Metadata'
import { Textarea } from '../ui/textarea'
interface GameFormProps {
    initialData?: any
}
const GameForm = ({ initialData }: GameFormProps) => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [jsonError, setJsonError] = useState('')
    const [categories, setCategories] = useState([])

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: initialData || {
            title: '',
            slug: '',
            category_id: '',
            thumbnail_url: '',
            embed_url: '',
            content: ''
        }
    })
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await fetch('/api/categories')
            const data = await response.json()
            setCategories(data)
        }
        fetchCategories()
    }, [])

    const onSubmit = async (data: any) => {
        try {
            setIsLoading(true)
            setError('')

            const submitData = {
                ...data,
                content: data.content
            }

            const response = await fetch('/api/game', {
                method: initialData ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(submitData)
            })
            if (!response.ok) throw new Error('Failed to save game')

            router.push('/admin/games')
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-6 max-w-5xl mt-12 p-12">
            <Card>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold">
                                {initialData ? 'Edit Game' : 'Create New Game'}
                            </h1>
                            <Button disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Game
                            </Button>
                        </div>

                        {error && (
                            <Alert variant="destructive" className="mb-6">
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        {/* Sections stacked vertically */}
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
                                <BasicInfoSection register={register} errors={errors} categories={categories} />
                            </section>

                            <section>
                                <h2 className="text-xl font-semibold mb-4">Content</h2>
                                <MetadataSection register={register} errors={errors} />
                            </section>
                        </div>
                        <div>
                            <label className="text-sm font-medium">Content (Markdown)</label>
                            <Textarea
                                {...register('content', { required: 'Content is required' })}
                                className="mt-1 font-mono"
                                rows={20}
                            />
                            {jsonError && (
                                <span className="text-red-500 text-sm">{jsonError}</span>
                            )}
                            {errors.content && (
                                <span className="text-red-500 text-sm">{errors.content.message as string}</span>
                            )}
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default GameForm