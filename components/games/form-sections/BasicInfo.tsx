import React from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface BasicInfoSectionProps {
    register: any
    errors: any
    categories: any
}

export const BasicInfoSection = ({ register, errors, categories }: BasicInfoSectionProps) => {
    return (
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium">Title</label>
                <Input
                    {...register('title', { required: 'Title is required' })}
                    className="mt-1"
                />
                {errors.title && (
                    <span className="text-red-500 text-sm">{errors.title.message}</span>
                )}
            </div>

            <div>
                <label className="text-sm font-medium">Slug</label>
                <Input
                    {...register('slug', { required: 'Slug is required' })}
                    className="mt-1"
                />
                {errors.slug && (
                    <span className="text-red-500 text-sm">{errors.slug.message}</span>
                )}
            </div>

            <div>
                <label className="text-sm font-medium">Category</label>
                <Select 
                    defaultValue={register('category_id')}
                    onValueChange={(value) => {
                        register('category_id').onChange({
                            target: { name: 'category_id', value }
                        })
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        {categories.length > 0 && categories.map((category: any) => (
                            <SelectItem key={category.id} value={category.id}>
                                {category.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                {errors.category_id && (
                    <span className="text-red-500 text-sm">{errors.category_id.message}</span>
                )}
            </div>

            <div>
                <label className="text-sm font-medium">Thumbnail URL</label>
                <Input {...register('thumbnail_url')} className="mt-1" type="url" />
            </div>

            <div>
                <label className="text-sm font-medium">Embed URL</label>
                <Input {...register('embed_url')} className="mt-1" type="url" />
            </div>
        </div>
    )
}
