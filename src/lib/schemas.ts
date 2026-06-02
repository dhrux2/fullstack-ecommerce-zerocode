import { z } from 'zod'

// Authentication Form Schemas
export const LoginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export const SignupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters long'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

// Checkout Shipping Form Schema
export const AddressSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters long'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'),
  addressLine1: z.string().min(5, 'Address line 1 must be at least 5 characters long'),
  addressLine2: z.string().optional(),
  city: z.string().min(2, 'City must be at least 2 characters long'),
  state: z.string().min(2, 'State must be at least 2 characters long'),
  postalCode: z.string().regex(/^\d{6}$/, 'Postal code must be exactly 6 digits'),
  country: z.string().default('IN'),
})

// Admin Product Creator/Editor Schema
export const ProductSchema = z.object({
  name: z.string().min(3, 'Product name must be at least 3 characters long').toUpperCase(),
  description: z.string().min(10, 'Description must be at least 10 characters long'),
  price: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().positive('Price must be a positive number')
  ),
  category: z.string().min(2, 'Please select or enter a category'),
  sizes: z.array(z.string()).min(1, 'Please select at least one size'),
  stock: z.preprocess(
    (val) => parseInt(val as string, 10),
    z.number().int().nonnegative('Stock must be a non-negative integer')
  ),
  featured: z.boolean().default(false),
})

export type LoginFormValues = z.infer<typeof LoginSchema>
export type SignupFormValues = z.infer<typeof SignupSchema>
export type AddressFormValues = z.infer<typeof AddressSchema>
export type ProductFormValues = z.infer<typeof ProductSchema>
