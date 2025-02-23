import React from 'react'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GameFormData } from '@/types/game'

interface MetadataSectionProps {
    register: UseFormRegister<GameFormData>
    errors: FieldErrors<GameFormData>
}

export const MetadataSection = ({ register, errors }: MetadataSectionProps) => {
    return (
        <div className="space-y-4">

            <div>
                <label className="text-sm font-medium">Meta Data</label>
                {/*  */}
                <Textarea
                    {...register('metadata')}
                    className="mt-1 h-40"
                />
                {errors.metadata && (
                    <span className="text-red-500 text-sm">{errors.metadata.message}</span>
                )}
            </div>
        </div>
    )
}
