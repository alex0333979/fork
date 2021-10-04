import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** Value custom scalar type */
  Value: any;
};

export type BillingAddress = {
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  postalCode: Scalars['Int'];
  state: Scalars['String'];
};

export type BillingAddressInput = {
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  postalCode: Scalars['Int'];
  state: Scalars['String'];
};

export type BillingAddressResponse = {
  data?: Maybe<BillingAddress>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Cart = {
  addConcierge: Scalars['Boolean'];
  billingAddress?: Maybe<BillingAddress>;
  items?: Maybe<Array<CartItem>>;
  promoCode?: Maybe<Scalars['String']>;
  shippingAddress?: Maybe<ShippingAddress>;
  shippingType: ShippingType;
  totalPrice: Scalars['Float'];
};

export type CartItem = {
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  product: ProductType;
  productId: Scalars['ID'];
};

export type CartItemInput = {
  description: Scalars['String'];
  name: Scalars['String'];
  product: ProductType;
  productId: Scalars['ID'];
};

export type CartResponse = {
  data?: Maybe<Cart>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Entry = {
  createdAt: Scalars['DateTime'];
  currentStep: Scalars['Int'];
  form: Form;
  formId: Scalars['ID'];
  id: Scalars['ID'];
  isComplete: Scalars['Boolean'];
  updatedAt: Scalars['DateTime'];
  userId: Scalars['ID'];
};

export type EntryPaginatedResponse = {
  data: Array<Entry>;
  total: Scalars['Float'];
};

export type EntryResponse = {
  data?: Maybe<Entry>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export enum FieldType {
  Button = 'Button',
  CheckBox = 'CheckBox',
  CountryPicker = 'CountryPicker',
  DatePicker = 'DatePicker',
  Input = 'Input',
  Label = 'Label',
  PhoneInput = 'PhoneInput',
  Radio = 'Radio',
  Select = 'Select',
  StatePicker = 'StatePicker',
  TextArea = 'TextArea'
}

export type Form = {
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  steps: Array<FormStep>;
};

export type FormField = {
  defaultValue?: Maybe<Scalars['Value']>;
  disabled?: Maybe<Scalars['Boolean']>;
  index?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Option>>;
  placeholder?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  type: FieldType;
  validations?: Maybe<Array<Validation>>;
  value?: Maybe<Scalars['Value']>;
};

export type FormFieldInput = {
  defaultValue?: Maybe<Scalars['Value']>;
  disabled?: Maybe<Scalars['Boolean']>;
  index?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  options?: Maybe<Array<OptionInput>>;
  placeholder?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['Boolean']>;
  text?: Maybe<Scalars['String']>;
  type: FieldType;
  validations?: Maybe<Array<ValidationInput>>;
  value?: Maybe<Scalars['Value']>;
};

export type FormResponse = {
  data?: Maybe<Form>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type FormStep = {
  fields: Array<FormField>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  step: Scalars['Int'];
};

export type FormStepInput = {
  fields: Array<FormFieldInput>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  step: Scalars['Int'];
};

export type Mutation = {
  AddBillingAddressToCart: CartResponse;
  AddItemsToCart: CartResponse;
  AddPromoCodeToCart: CartResponse;
  AddShippingAddressToCart: CartResponse;
  ClearCart: CartResponse;
  CreateGuest: TokenResponse;
  CreateOrder: OrderResponse;
  GetPaymentIntent: PaymentIntentResponse;
  Login: TokenResponse;
  RemoveItemsFromCart: CartResponse;
  SetDefaultBillingAddress: BillingAddressResponse;
  SetDefaultShippingAddress: ShippingAddressResponse;
  SetShippingTypeToCart: CartResponse;
  SetTrackingNumber: OrderResponse;
  SignUp: UserResponse;
  SubmitEntry: EntryResponse;
};


export type MutationAddBillingAddressToCartArgs = {
  billingAddress: BillingAddressInput;
};


export type MutationAddItemsToCartArgs = {
  items: Array<CartItemInput>;
};


export type MutationAddPromoCodeToCartArgs = {
  promoCode: Scalars['String'];
};


export type MutationAddShippingAddressToCartArgs = {
  shippingAddress: ShippingAddressInput;
};


export type MutationGetPaymentIntentArgs = {
  orderId: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveItemsFromCartArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationSetDefaultBillingAddressArgs = {
  billingAddress: BillingAddressInput;
};


export type MutationSetDefaultShippingAddressArgs = {
  shippingAddress: ShippingAddressInput;
};


export type MutationSetShippingTypeToCartArgs = {
  addConcierge: Scalars['Boolean'];
  shippingType: Scalars['String'];
};


export type MutationSetTrackingNumberArgs = {
  orderId: Scalars['String'];
  trackingNumber: Scalars['String'];
};


export type MutationSignUpArgs = {
  user: UserInput;
};


export type MutationSubmitEntryArgs = {
  entryId?: Maybe<Scalars['ID']>;
  formId: Scalars['ID'];
  formStep: FormStepInput;
};

export type Option = {
  notes?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  value: Scalars['Value'];
};

export type OptionInput = {
  notes?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  value: Scalars['Value'];
};

export type Order = {
  addConcierge: Scalars['Boolean'];
  billingAddress: BillingAddress;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  items: Array<CartItem>;
  orderNumber: Scalars['Int'];
  promoCode?: Maybe<Scalars['String']>;
  shippingAddress: ShippingAddress;
  shippingType: ShippingType;
  status: OrderTrack;
  totalPrice: Scalars['Float'];
  trackingNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['ID'];
};

export type OrderPaginatedResponse = {
  data: Array<Order>;
  total: Scalars['Float'];
};

export type OrderResponse = {
  data?: Maybe<Order>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export enum OrderStatus {
  Completed = 'COMPLETED',
  NotStarted = 'NOT_STARTED',
  OnProgress = 'ON_PROGRESS',
  Pending = 'PENDING'
}

export type OrderTrack = {
  confirmOrder: TrackStep;
  delivered: TrackStep;
  outForDelivery: TrackStep;
  productPrepared: TrackStep;
  shipped: TrackStep;
};

export type PaymentIntent = {
  clientSecret: Scalars['String'];
};

export type PaymentIntentResponse = {
  data?: Maybe<PaymentIntent>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export enum ProductType {
  PassportApplication = 'PASSPORT_APPLICATION',
  PassportPhoto = 'PASSPORT_PHOTO'
}

export type Query = {
  Cart: CartResponse;
  CompletedOrders: OrderPaginatedResponse;
  Entries: EntryPaginatedResponse;
  Entry: EntryResponse;
  Form: FormResponse;
  Forms: Array<Form>;
  Me: UserResponse;
  OrderByOrderNumber: OrderResponse;
  Orders: OrderPaginatedResponse;
};


export type QueryCompletedOrdersArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryEntriesArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryEntryArgs = {
  entryId: Scalars['String'];
};


export type QueryFormArgs = {
  id: Scalars['String'];
};


export type QueryOrderByOrderNumberArgs = {
  orderNumber: Scalars['Float'];
};


export type QueryOrdersArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
};

export type ShippingAddress = {
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  postalCode: Scalars['Int'];
  state: Scalars['String'];
};

export type ShippingAddressInput = {
  address1: Scalars['String'];
  address2: Scalars['String'];
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  postalCode: Scalars['Int'];
  state: Scalars['String'];
};

export type ShippingAddressResponse = {
  data?: Maybe<ShippingAddress>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export enum ShippingType {
  Free = 'FREE',
  From1To2 = 'FROM1TO2',
  From3To3 = 'FROM3TO3',
  From3To6 = 'FROM3TO6'
}

export type Token = {
  accessToken: Scalars['String'];
};

export type TokenResponse = {
  data?: Maybe<Token>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type TrackStep = {
  createdAt: Scalars['DateTime'];
  status: OrderStatus;
  updatedAt: Scalars['DateTime'];
};

export type User = {
  billingAddress?: Maybe<BillingAddress>;
  cart?: Maybe<Cart>;
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  shippingAddress?: Maybe<ShippingAddress>;
  updatedAt: Scalars['DateTime'];
};

export type UserInput = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type UserResponse = {
  data?: Maybe<User>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Validation = {
  message?: Maybe<Scalars['String']>;
  type: ValidationType;
  value?: Maybe<Scalars['Float']>;
};

export type ValidationInput = {
  message?: Maybe<Scalars['String']>;
  type: ValidationType;
  value?: Maybe<Scalars['Float']>;
};

export enum ValidationType {
  IsEmail = 'IsEmail',
  IsNumber = 'IsNumber',
  IsPhone = 'IsPhone',
  Max = 'Max',
  MaxLength = 'MaxLength',
  Min = 'Min',
  MinLength = 'MinLength',
  Nullable = 'Nullable'
}

export type BillingAddressFragment = { __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string };

export type ShippingAddressFragment = { __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string };

export type CartItemFragment = { __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string };

export type CartFragment = { __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, addConcierge: boolean, totalPrice: number, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>> };

export type UserFragment = { __typename: 'User', id: string, email?: Maybe<string>, firstName?: Maybe<string>, lastName?: Maybe<string>, phone?: Maybe<string>, createdAt: any, updatedAt: any, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, cart?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, addConcierge: boolean, totalPrice: number, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>> }> };

export type OptionFragment = { __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any };

export type ValidationFragment = { __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> };

export type FormFieldFragment = { __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> };

export type FormStepFragment = { __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> };

export type FormFragment = { __typename: 'Form', id: string, name: string, description: string, steps: Array<{ __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> }> };

export type EntryFragment = { __typename: 'Entry', id: string, userId: string, currentStep: number, isComplete: boolean, formId: string, createdAt: any, updatedAt: any, form: { __typename: 'Form', id: string, name: string, description: string, steps: Array<{ __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> }> } };

export type TrackStepFragment = { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any };

export type OrderTrackFragment = { __typename: 'OrderTrack', confirmOrder: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, productPrepared: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, shipped: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, outForDelivery: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, delivered: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any } };

export type OrderFragment = { __typename: 'Order', id: string, totalPrice: number, promoCode?: Maybe<string>, orderNumber: number, shippingType: ShippingType, trackingNumber?: Maybe<string>, createdAt: any, updatedAt: any, items: Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>, billingAddress: { __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }, shippingAddress: { __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }, status: { __typename: 'OrderTrack', confirmOrder: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, productPrepared: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, shipped: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, outForDelivery: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, delivered: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any } } };

export type CreateGuestMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateGuestMutation = { __typename: 'Mutation', CreateGuest: { __typename: 'TokenResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Token', accessToken: string }> } };

export type SignUpMutationVariables = Exact<{
  user: UserInput;
}>;


export type SignUpMutation = { __typename: 'Mutation', SignUp: { __typename: 'UserResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'User', id: string, email?: Maybe<string>, firstName?: Maybe<string>, lastName?: Maybe<string>, phone?: Maybe<string>, createdAt: any, updatedAt: any, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, cart?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, addConcierge: boolean, totalPrice: number, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>> }> }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename: 'Mutation', Login: { __typename: 'TokenResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Token', accessToken: string }> } };

export type SetDefaultBillingAddressMutationVariables = Exact<{
  billingAddress: BillingAddressInput;
}>;


export type SetDefaultBillingAddressMutation = { __typename: 'Mutation', SetDefaultBillingAddress: { __typename: 'BillingAddressResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }> } };

export type SetDefaultShippingAddressMutationVariables = Exact<{
  shippingAddress: ShippingAddressInput;
}>;


export type SetDefaultShippingAddressMutation = { __typename: 'Mutation', SetDefaultShippingAddress: { __typename: 'ShippingAddressResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }> } };

export type SetTrackingNumberMutationVariables = Exact<{
  trackingNumber: Scalars['String'];
  orderId: Scalars['String'];
}>;


export type SetTrackingNumberMutation = { __typename: 'Mutation', SetTrackingNumber: { __typename: 'OrderResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Order', id: string, totalPrice: number, promoCode?: Maybe<string>, orderNumber: number, shippingType: ShippingType, trackingNumber?: Maybe<string>, createdAt: any, updatedAt: any, items: Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>, billingAddress: { __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }, shippingAddress: { __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }, status: { __typename: 'OrderTrack', confirmOrder: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, productPrepared: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, shipped: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, outForDelivery: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, delivered: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any } } }> } };

export type SubmitEntryMutationVariables = Exact<{
  entryId?: Maybe<Scalars['ID']>;
  formId: Scalars['ID'];
  formStep: FormStepInput;
}>;


export type SubmitEntryMutation = { __typename: 'Mutation', SubmitEntry: { __typename: 'EntryResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Entry', id: string, userId: string, currentStep: number, isComplete: boolean, formId: string, createdAt: any, updatedAt: any, form: { __typename: 'Form', id: string, name: string, description: string, steps: Array<{ __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> }> } }> } };

export type AddItemsToCartMutationVariables = Exact<{
  cartItems: Array<CartItemInput> | CartItemInput;
}>;


export type AddItemsToCartMutation = { __typename: 'Mutation', AddItemsToCart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, addConcierge: boolean, totalPrice: number, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>> }> } };

export type ClearCartMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearCartMutation = { __typename: 'Mutation', ClearCart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, addConcierge: boolean, totalPrice: number, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>> }> } };

export type RemoveItemsFromCartMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type RemoveItemsFromCartMutation = { __typename: 'Mutation', RemoveItemsFromCart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, addConcierge: boolean, totalPrice: number, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>> }> } };

export type AddShippingAddressToCartMutationVariables = Exact<{
  shippingAddress: ShippingAddressInput;
}>;


export type AddShippingAddressToCartMutation = { __typename: 'Mutation', AddShippingAddressToCart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, addConcierge: boolean, totalPrice: number, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>> }> } };

export type AddBillingAddressToCartMutationVariables = Exact<{
  billingAddress: BillingAddressInput;
}>;


export type AddBillingAddressToCartMutation = { __typename: 'Mutation', AddBillingAddressToCart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, addConcierge: boolean, totalPrice: number, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>> }> } };

export type SetShippingTypeToCartMutationVariables = Exact<{
  shippingType: Scalars['String'];
  addConcierge: Scalars['Boolean'];
}>;


export type SetShippingTypeToCartMutation = { __typename: 'Mutation', SetShippingTypeToCart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, addConcierge: boolean, totalPrice: number, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>> }> } };

export type AddPromoCodeToCartMutationVariables = Exact<{
  promoCode: Scalars['String'];
}>;


export type AddPromoCodeToCartMutation = { __typename: 'Mutation', AddPromoCodeToCart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, addConcierge: boolean, totalPrice: number, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>> }> } };

export type CreateOrderMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateOrderMutation = { __typename: 'Mutation', CreateOrder: { __typename: 'OrderResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Order', id: string, totalPrice: number, promoCode?: Maybe<string>, orderNumber: number, shippingType: ShippingType, trackingNumber?: Maybe<string>, createdAt: any, updatedAt: any, items: Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>, billingAddress: { __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }, shippingAddress: { __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }, status: { __typename: 'OrderTrack', confirmOrder: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, productPrepared: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, shipped: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, outForDelivery: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, delivered: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any } } }> } };

export type GetPaymentIntentMutationVariables = Exact<{
  orderId: Scalars['String'];
}>;


export type GetPaymentIntentMutation = { __typename: 'Mutation', GetPaymentIntent: { __typename: 'PaymentIntentResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'PaymentIntent', clientSecret: string }> } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename: 'Query', Me: { __typename: 'UserResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'User', id: string, email?: Maybe<string>, firstName?: Maybe<string>, lastName?: Maybe<string>, phone?: Maybe<string>, createdAt: any, updatedAt: any, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, cart?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, addConcierge: boolean, totalPrice: number, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>> }> }> } };

export type FormsQueryVariables = Exact<{ [key: string]: never; }>;


export type FormsQuery = { __typename: 'Query', Forms: Array<{ __typename: 'Form', id: string, name: string, description: string, steps: Array<{ __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> }> }> };

export type FormQueryVariables = Exact<{
  formId: Scalars['String'];
}>;


export type FormQuery = { __typename: 'Query', Form: { __typename: 'FormResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Form', id: string, name: string, description: string, steps: Array<{ __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> }> }> } };

export type EntriesQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
}>;


export type EntriesQuery = { __typename: 'Query', Entries: { __typename: 'EntryPaginatedResponse', total: number, data: Array<{ __typename: 'Entry', id: string, userId: string, currentStep: number, isComplete: boolean, formId: string, createdAt: any, updatedAt: any, form: { __typename: 'Form', id: string, name: string, description: string, steps: Array<{ __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> }> } }> } };

export type EntryQueryVariables = Exact<{
  entryId: Scalars['String'];
}>;


export type EntryQuery = { __typename: 'Query', Entry: { __typename: 'EntryResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Entry', id: string, userId: string, currentStep: number, isComplete: boolean, formId: string, createdAt: any, updatedAt: any, form: { __typename: 'Form', id: string, name: string, description: string, steps: Array<{ __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> }> } }> } };

export type OrdersQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
}>;


export type OrdersQuery = { __typename: 'Query', Orders: { __typename: 'OrderPaginatedResponse', total: number, data: Array<{ __typename: 'Order', id: string, totalPrice: number, promoCode?: Maybe<string>, orderNumber: number, shippingType: ShippingType, trackingNumber?: Maybe<string>, createdAt: any, updatedAt: any, items: Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>, billingAddress: { __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }, shippingAddress: { __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }, status: { __typename: 'OrderTrack', confirmOrder: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, productPrepared: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, shipped: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, outForDelivery: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, delivered: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any } } }> } };

export type CartQueryVariables = Exact<{ [key: string]: never; }>;


export type CartQuery = { __typename: 'Query', Cart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, addConcierge: boolean, totalPrice: number, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>> }> } };

export type CompletedOrdersQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
}>;


export type CompletedOrdersQuery = { __typename: 'Query', CompletedOrders: { __typename: 'OrderPaginatedResponse', total: number, data: Array<{ __typename: 'Order', id: string, totalPrice: number, promoCode?: Maybe<string>, orderNumber: number, shippingType: ShippingType, trackingNumber?: Maybe<string>, createdAt: any, updatedAt: any, items: Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>, billingAddress: { __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }, shippingAddress: { __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }, status: { __typename: 'OrderTrack', confirmOrder: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, productPrepared: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, shipped: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, outForDelivery: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, delivered: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any } } }> } };

export type OrderByOrderNumberQueryVariables = Exact<{
  orderNumber: Scalars['Float'];
}>;


export type OrderByOrderNumberQuery = { __typename: 'Query', OrderByOrderNumber: { __typename: 'OrderResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Order', id: string, totalPrice: number, promoCode?: Maybe<string>, orderNumber: number, shippingType: ShippingType, trackingNumber?: Maybe<string>, createdAt: any, updatedAt: any, items: Array<{ __typename: 'CartItem', id: string, name: string, price: number, product: ProductType, productId: string, description: string }>, billingAddress: { __typename: 'BillingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string }, shippingAddress: { __typename: 'ShippingAddress', address1: string, address2: string, city: string, country: string, firstName: string, lastName: string, postalCode: number, state: string, email: string, phone: string }, status: { __typename: 'OrderTrack', confirmOrder: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, productPrepared: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, shipped: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, outForDelivery: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any }, delivered: { __typename: 'TrackStep', status: OrderStatus, createdAt: any, updatedAt: any } } }> } };

export const BillingAddressFragmentDoc = gql`
    fragment BillingAddress on BillingAddress {
  address1
  address2
  city
  country
  firstName
  lastName
  postalCode
  state
}
    `;
export const ShippingAddressFragmentDoc = gql`
    fragment ShippingAddress on ShippingAddress {
  address1
  address2
  city
  country
  firstName
  lastName
  postalCode
  state
  email
  phone
}
    `;
export const CartItemFragmentDoc = gql`
    fragment CartItem on CartItem {
  id
  name
  price
  product
  productId
  description
}
    `;
export const CartFragmentDoc = gql`
    fragment Cart on Cart {
  billingAddress {
    ...BillingAddress
  }
  shippingAddress {
    ...ShippingAddress
  }
  items {
    ...CartItem
  }
  promoCode
  shippingType
  addConcierge
  totalPrice
}
    ${BillingAddressFragmentDoc}
${ShippingAddressFragmentDoc}
${CartItemFragmentDoc}`;
export const UserFragmentDoc = gql`
    fragment User on User {
  id
  email
  firstName
  lastName
  phone
  createdAt
  updatedAt
  billingAddress {
    ...BillingAddress
  }
  shippingAddress {
    ...ShippingAddress
  }
  cart {
    ...Cart
  }
}
    ${BillingAddressFragmentDoc}
${ShippingAddressFragmentDoc}
${CartFragmentDoc}`;
export const OptionFragmentDoc = gql`
    fragment Option on Option {
  notes
  text
  value
}
    `;
export const ValidationFragmentDoc = gql`
    fragment Validation on Validation {
  message
  type
  value
}
    `;
export const FormFieldFragmentDoc = gql`
    fragment FormField on FormField {
  index
  name
  type
  text
  required
  value
  defaultValue
  disabled
  notes
  placeholder
  options {
    ...Option
  }
  validations {
    ...Validation
  }
}
    ${OptionFragmentDoc}
${ValidationFragmentDoc}`;
export const FormStepFragmentDoc = gql`
    fragment FormStep on FormStep {
  name
  step
  notes
  fields {
    ...FormField
  }
}
    ${FormFieldFragmentDoc}`;
export const FormFragmentDoc = gql`
    fragment Form on Form {
  id
  name
  description
  steps {
    ...FormStep
  }
}
    ${FormStepFragmentDoc}`;
export const EntryFragmentDoc = gql`
    fragment Entry on Entry {
  id
  userId
  currentStep
  isComplete
  formId
  form {
    ...Form
  }
  createdAt
  updatedAt
}
    ${FormFragmentDoc}`;
export const TrackStepFragmentDoc = gql`
    fragment TrackStep on TrackStep {
  status
  createdAt
  updatedAt
}
    `;
export const OrderTrackFragmentDoc = gql`
    fragment OrderTrack on OrderTrack {
  confirmOrder {
    ...TrackStep
  }
  productPrepared {
    ...TrackStep
  }
  shipped {
    ...TrackStep
  }
  outForDelivery {
    ...TrackStep
  }
  delivered {
    ...TrackStep
  }
}
    ${TrackStepFragmentDoc}`;
export const OrderFragmentDoc = gql`
    fragment Order on Order {
  id
  items {
    ...CartItem
  }
  billingAddress {
    ...BillingAddress
  }
  shippingAddress {
    ...ShippingAddress
  }
  status {
    ...OrderTrack
  }
  totalPrice
  promoCode
  orderNumber
  shippingType
  trackingNumber
  createdAt
  updatedAt
}
    ${CartItemFragmentDoc}
${BillingAddressFragmentDoc}
${ShippingAddressFragmentDoc}
${OrderTrackFragmentDoc}`;
export const CreateGuestDocument = gql`
    mutation CreateGuest {
  CreateGuest {
    message
    status
    data {
      accessToken
    }
  }
}
    `;
export type CreateGuestMutationFn = Apollo.MutationFunction<CreateGuestMutation, CreateGuestMutationVariables>;

/**
 * __useCreateGuestMutation__
 *
 * To run a mutation, you first call `useCreateGuestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateGuestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createGuestMutation, { data, loading, error }] = useCreateGuestMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateGuestMutation(baseOptions?: Apollo.MutationHookOptions<CreateGuestMutation, CreateGuestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateGuestMutation, CreateGuestMutationVariables>(CreateGuestDocument, options);
      }
export type CreateGuestMutationHookResult = ReturnType<typeof useCreateGuestMutation>;
export type CreateGuestMutationResult = Apollo.MutationResult<CreateGuestMutation>;
export type CreateGuestMutationOptions = Apollo.BaseMutationOptions<CreateGuestMutation, CreateGuestMutationVariables>;
export const SignUpDocument = gql`
    mutation SignUp($user: UserInput!) {
  SignUp(user: $user) {
    message
    status
    data {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  Login(email: $email, password: $password) {
    message
    status
    data {
      accessToken
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SetDefaultBillingAddressDocument = gql`
    mutation SetDefaultBillingAddress($billingAddress: BillingAddressInput!) {
  SetDefaultBillingAddress(billingAddress: $billingAddress) {
    message
    status
    data {
      ...BillingAddress
    }
  }
}
    ${BillingAddressFragmentDoc}`;
export type SetDefaultBillingAddressMutationFn = Apollo.MutationFunction<SetDefaultBillingAddressMutation, SetDefaultBillingAddressMutationVariables>;

/**
 * __useSetDefaultBillingAddressMutation__
 *
 * To run a mutation, you first call `useSetDefaultBillingAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDefaultBillingAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDefaultBillingAddressMutation, { data, loading, error }] = useSetDefaultBillingAddressMutation({
 *   variables: {
 *      billingAddress: // value for 'billingAddress'
 *   },
 * });
 */
export function useSetDefaultBillingAddressMutation(baseOptions?: Apollo.MutationHookOptions<SetDefaultBillingAddressMutation, SetDefaultBillingAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDefaultBillingAddressMutation, SetDefaultBillingAddressMutationVariables>(SetDefaultBillingAddressDocument, options);
      }
export type SetDefaultBillingAddressMutationHookResult = ReturnType<typeof useSetDefaultBillingAddressMutation>;
export type SetDefaultBillingAddressMutationResult = Apollo.MutationResult<SetDefaultBillingAddressMutation>;
export type SetDefaultBillingAddressMutationOptions = Apollo.BaseMutationOptions<SetDefaultBillingAddressMutation, SetDefaultBillingAddressMutationVariables>;
export const SetDefaultShippingAddressDocument = gql`
    mutation SetDefaultShippingAddress($shippingAddress: ShippingAddressInput!) {
  SetDefaultShippingAddress(shippingAddress: $shippingAddress) {
    message
    status
    data {
      ...ShippingAddress
    }
  }
}
    ${ShippingAddressFragmentDoc}`;
export type SetDefaultShippingAddressMutationFn = Apollo.MutationFunction<SetDefaultShippingAddressMutation, SetDefaultShippingAddressMutationVariables>;

/**
 * __useSetDefaultShippingAddressMutation__
 *
 * To run a mutation, you first call `useSetDefaultShippingAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDefaultShippingAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDefaultShippingAddressMutation, { data, loading, error }] = useSetDefaultShippingAddressMutation({
 *   variables: {
 *      shippingAddress: // value for 'shippingAddress'
 *   },
 * });
 */
export function useSetDefaultShippingAddressMutation(baseOptions?: Apollo.MutationHookOptions<SetDefaultShippingAddressMutation, SetDefaultShippingAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDefaultShippingAddressMutation, SetDefaultShippingAddressMutationVariables>(SetDefaultShippingAddressDocument, options);
      }
export type SetDefaultShippingAddressMutationHookResult = ReturnType<typeof useSetDefaultShippingAddressMutation>;
export type SetDefaultShippingAddressMutationResult = Apollo.MutationResult<SetDefaultShippingAddressMutation>;
export type SetDefaultShippingAddressMutationOptions = Apollo.BaseMutationOptions<SetDefaultShippingAddressMutation, SetDefaultShippingAddressMutationVariables>;
export const SetTrackingNumberDocument = gql`
    mutation SetTrackingNumber($trackingNumber: String!, $orderId: String!) {
  SetTrackingNumber(trackingNumber: $trackingNumber, orderId: $orderId) {
    message
    status
    data {
      ...Order
    }
  }
}
    ${OrderFragmentDoc}`;
export type SetTrackingNumberMutationFn = Apollo.MutationFunction<SetTrackingNumberMutation, SetTrackingNumberMutationVariables>;

/**
 * __useSetTrackingNumberMutation__
 *
 * To run a mutation, you first call `useSetTrackingNumberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetTrackingNumberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setTrackingNumberMutation, { data, loading, error }] = useSetTrackingNumberMutation({
 *   variables: {
 *      trackingNumber: // value for 'trackingNumber'
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useSetTrackingNumberMutation(baseOptions?: Apollo.MutationHookOptions<SetTrackingNumberMutation, SetTrackingNumberMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetTrackingNumberMutation, SetTrackingNumberMutationVariables>(SetTrackingNumberDocument, options);
      }
export type SetTrackingNumberMutationHookResult = ReturnType<typeof useSetTrackingNumberMutation>;
export type SetTrackingNumberMutationResult = Apollo.MutationResult<SetTrackingNumberMutation>;
export type SetTrackingNumberMutationOptions = Apollo.BaseMutationOptions<SetTrackingNumberMutation, SetTrackingNumberMutationVariables>;
export const SubmitEntryDocument = gql`
    mutation SubmitEntry($entryId: ID, $formId: ID!, $formStep: FormStepInput!) {
  SubmitEntry(entryId: $entryId, formId: $formId, formStep: $formStep) {
    message
    status
    data {
      id
      userId
      currentStep
      isComplete
      formId
      form {
        ...Form
      }
      createdAt
      updatedAt
    }
  }
}
    ${FormFragmentDoc}`;
export type SubmitEntryMutationFn = Apollo.MutationFunction<SubmitEntryMutation, SubmitEntryMutationVariables>;

/**
 * __useSubmitEntryMutation__
 *
 * To run a mutation, you first call `useSubmitEntryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubmitEntryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [submitEntryMutation, { data, loading, error }] = useSubmitEntryMutation({
 *   variables: {
 *      entryId: // value for 'entryId'
 *      formId: // value for 'formId'
 *      formStep: // value for 'formStep'
 *   },
 * });
 */
export function useSubmitEntryMutation(baseOptions?: Apollo.MutationHookOptions<SubmitEntryMutation, SubmitEntryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SubmitEntryMutation, SubmitEntryMutationVariables>(SubmitEntryDocument, options);
      }
export type SubmitEntryMutationHookResult = ReturnType<typeof useSubmitEntryMutation>;
export type SubmitEntryMutationResult = Apollo.MutationResult<SubmitEntryMutation>;
export type SubmitEntryMutationOptions = Apollo.BaseMutationOptions<SubmitEntryMutation, SubmitEntryMutationVariables>;
export const AddItemsToCartDocument = gql`
    mutation AddItemsToCart($cartItems: [CartItemInput!]!) {
  AddItemsToCart(items: $cartItems) {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export type AddItemsToCartMutationFn = Apollo.MutationFunction<AddItemsToCartMutation, AddItemsToCartMutationVariables>;

/**
 * __useAddItemsToCartMutation__
 *
 * To run a mutation, you first call `useAddItemsToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemsToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemsToCartMutation, { data, loading, error }] = useAddItemsToCartMutation({
 *   variables: {
 *      cartItems: // value for 'cartItems'
 *   },
 * });
 */
export function useAddItemsToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddItemsToCartMutation, AddItemsToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemsToCartMutation, AddItemsToCartMutationVariables>(AddItemsToCartDocument, options);
      }
export type AddItemsToCartMutationHookResult = ReturnType<typeof useAddItemsToCartMutation>;
export type AddItemsToCartMutationResult = Apollo.MutationResult<AddItemsToCartMutation>;
export type AddItemsToCartMutationOptions = Apollo.BaseMutationOptions<AddItemsToCartMutation, AddItemsToCartMutationVariables>;
export const ClearCartDocument = gql`
    mutation ClearCart {
  ClearCart {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export type ClearCartMutationFn = Apollo.MutationFunction<ClearCartMutation, ClearCartMutationVariables>;

/**
 * __useClearCartMutation__
 *
 * To run a mutation, you first call `useClearCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearCartMutation, { data, loading, error }] = useClearCartMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearCartMutation(baseOptions?: Apollo.MutationHookOptions<ClearCartMutation, ClearCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ClearCartMutation, ClearCartMutationVariables>(ClearCartDocument, options);
      }
export type ClearCartMutationHookResult = ReturnType<typeof useClearCartMutation>;
export type ClearCartMutationResult = Apollo.MutationResult<ClearCartMutation>;
export type ClearCartMutationOptions = Apollo.BaseMutationOptions<ClearCartMutation, ClearCartMutationVariables>;
export const RemoveItemsFromCartDocument = gql`
    mutation RemoveItemsFromCart($ids: [ID!]!) {
  RemoveItemsFromCart(ids: $ids) {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export type RemoveItemsFromCartMutationFn = Apollo.MutationFunction<RemoveItemsFromCartMutation, RemoveItemsFromCartMutationVariables>;

/**
 * __useRemoveItemsFromCartMutation__
 *
 * To run a mutation, you first call `useRemoveItemsFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveItemsFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeItemsFromCartMutation, { data, loading, error }] = useRemoveItemsFromCartMutation({
 *   variables: {
 *      ids: // value for 'ids'
 *   },
 * });
 */
export function useRemoveItemsFromCartMutation(baseOptions?: Apollo.MutationHookOptions<RemoveItemsFromCartMutation, RemoveItemsFromCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveItemsFromCartMutation, RemoveItemsFromCartMutationVariables>(RemoveItemsFromCartDocument, options);
      }
export type RemoveItemsFromCartMutationHookResult = ReturnType<typeof useRemoveItemsFromCartMutation>;
export type RemoveItemsFromCartMutationResult = Apollo.MutationResult<RemoveItemsFromCartMutation>;
export type RemoveItemsFromCartMutationOptions = Apollo.BaseMutationOptions<RemoveItemsFromCartMutation, RemoveItemsFromCartMutationVariables>;
export const AddShippingAddressToCartDocument = gql`
    mutation AddShippingAddressToCart($shippingAddress: ShippingAddressInput!) {
  AddShippingAddressToCart(shippingAddress: $shippingAddress) {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export type AddShippingAddressToCartMutationFn = Apollo.MutationFunction<AddShippingAddressToCartMutation, AddShippingAddressToCartMutationVariables>;

/**
 * __useAddShippingAddressToCartMutation__
 *
 * To run a mutation, you first call `useAddShippingAddressToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddShippingAddressToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addShippingAddressToCartMutation, { data, loading, error }] = useAddShippingAddressToCartMutation({
 *   variables: {
 *      shippingAddress: // value for 'shippingAddress'
 *   },
 * });
 */
export function useAddShippingAddressToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddShippingAddressToCartMutation, AddShippingAddressToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddShippingAddressToCartMutation, AddShippingAddressToCartMutationVariables>(AddShippingAddressToCartDocument, options);
      }
export type AddShippingAddressToCartMutationHookResult = ReturnType<typeof useAddShippingAddressToCartMutation>;
export type AddShippingAddressToCartMutationResult = Apollo.MutationResult<AddShippingAddressToCartMutation>;
export type AddShippingAddressToCartMutationOptions = Apollo.BaseMutationOptions<AddShippingAddressToCartMutation, AddShippingAddressToCartMutationVariables>;
export const AddBillingAddressToCartDocument = gql`
    mutation AddBillingAddressToCart($billingAddress: BillingAddressInput!) {
  AddBillingAddressToCart(billingAddress: $billingAddress) {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export type AddBillingAddressToCartMutationFn = Apollo.MutationFunction<AddBillingAddressToCartMutation, AddBillingAddressToCartMutationVariables>;

/**
 * __useAddBillingAddressToCartMutation__
 *
 * To run a mutation, you first call `useAddBillingAddressToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddBillingAddressToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addBillingAddressToCartMutation, { data, loading, error }] = useAddBillingAddressToCartMutation({
 *   variables: {
 *      billingAddress: // value for 'billingAddress'
 *   },
 * });
 */
export function useAddBillingAddressToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddBillingAddressToCartMutation, AddBillingAddressToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddBillingAddressToCartMutation, AddBillingAddressToCartMutationVariables>(AddBillingAddressToCartDocument, options);
      }
export type AddBillingAddressToCartMutationHookResult = ReturnType<typeof useAddBillingAddressToCartMutation>;
export type AddBillingAddressToCartMutationResult = Apollo.MutationResult<AddBillingAddressToCartMutation>;
export type AddBillingAddressToCartMutationOptions = Apollo.BaseMutationOptions<AddBillingAddressToCartMutation, AddBillingAddressToCartMutationVariables>;
export const SetShippingTypeToCartDocument = gql`
    mutation SetShippingTypeToCart($shippingType: String!, $addConcierge: Boolean!) {
  SetShippingTypeToCart(shippingType: $shippingType, addConcierge: $addConcierge) {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export type SetShippingTypeToCartMutationFn = Apollo.MutationFunction<SetShippingTypeToCartMutation, SetShippingTypeToCartMutationVariables>;

/**
 * __useSetShippingTypeToCartMutation__
 *
 * To run a mutation, you first call `useSetShippingTypeToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetShippingTypeToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setShippingTypeToCartMutation, { data, loading, error }] = useSetShippingTypeToCartMutation({
 *   variables: {
 *      shippingType: // value for 'shippingType'
 *      addConcierge: // value for 'addConcierge'
 *   },
 * });
 */
export function useSetShippingTypeToCartMutation(baseOptions?: Apollo.MutationHookOptions<SetShippingTypeToCartMutation, SetShippingTypeToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetShippingTypeToCartMutation, SetShippingTypeToCartMutationVariables>(SetShippingTypeToCartDocument, options);
      }
export type SetShippingTypeToCartMutationHookResult = ReturnType<typeof useSetShippingTypeToCartMutation>;
export type SetShippingTypeToCartMutationResult = Apollo.MutationResult<SetShippingTypeToCartMutation>;
export type SetShippingTypeToCartMutationOptions = Apollo.BaseMutationOptions<SetShippingTypeToCartMutation, SetShippingTypeToCartMutationVariables>;
export const AddPromoCodeToCartDocument = gql`
    mutation AddPromoCodeToCart($promoCode: String!) {
  AddPromoCodeToCart(promoCode: $promoCode) {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export type AddPromoCodeToCartMutationFn = Apollo.MutationFunction<AddPromoCodeToCartMutation, AddPromoCodeToCartMutationVariables>;

/**
 * __useAddPromoCodeToCartMutation__
 *
 * To run a mutation, you first call `useAddPromoCodeToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPromoCodeToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPromoCodeToCartMutation, { data, loading, error }] = useAddPromoCodeToCartMutation({
 *   variables: {
 *      promoCode: // value for 'promoCode'
 *   },
 * });
 */
export function useAddPromoCodeToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddPromoCodeToCartMutation, AddPromoCodeToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddPromoCodeToCartMutation, AddPromoCodeToCartMutationVariables>(AddPromoCodeToCartDocument, options);
      }
export type AddPromoCodeToCartMutationHookResult = ReturnType<typeof useAddPromoCodeToCartMutation>;
export type AddPromoCodeToCartMutationResult = Apollo.MutationResult<AddPromoCodeToCartMutation>;
export type AddPromoCodeToCartMutationOptions = Apollo.BaseMutationOptions<AddPromoCodeToCartMutation, AddPromoCodeToCartMutationVariables>;
export const CreateOrderDocument = gql`
    mutation CreateOrder {
  CreateOrder {
    message
    status
    data {
      ...Order
    }
  }
}
    ${OrderFragmentDoc}`;
export type CreateOrderMutationFn = Apollo.MutationFunction<CreateOrderMutation, CreateOrderMutationVariables>;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export type CreateOrderMutationResult = Apollo.MutationResult<CreateOrderMutation>;
export type CreateOrderMutationOptions = Apollo.BaseMutationOptions<CreateOrderMutation, CreateOrderMutationVariables>;
export const GetPaymentIntentDocument = gql`
    mutation GetPaymentIntent($orderId: String!) {
  GetPaymentIntent(orderId: $orderId) {
    message
    status
    data {
      clientSecret
    }
  }
}
    `;
export type GetPaymentIntentMutationFn = Apollo.MutationFunction<GetPaymentIntentMutation, GetPaymentIntentMutationVariables>;

/**
 * __useGetPaymentIntentMutation__
 *
 * To run a mutation, you first call `useGetPaymentIntentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetPaymentIntentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getPaymentIntentMutation, { data, loading, error }] = useGetPaymentIntentMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useGetPaymentIntentMutation(baseOptions?: Apollo.MutationHookOptions<GetPaymentIntentMutation, GetPaymentIntentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetPaymentIntentMutation, GetPaymentIntentMutationVariables>(GetPaymentIntentDocument, options);
      }
export type GetPaymentIntentMutationHookResult = ReturnType<typeof useGetPaymentIntentMutation>;
export type GetPaymentIntentMutationResult = Apollo.MutationResult<GetPaymentIntentMutation>;
export type GetPaymentIntentMutationOptions = Apollo.BaseMutationOptions<GetPaymentIntentMutation, GetPaymentIntentMutationVariables>;
export const MeDocument = gql`
    query Me {
  Me {
    message
    status
    data {
      ...User
    }
  }
}
    ${UserFragmentDoc}`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const FormsDocument = gql`
    query Forms {
  Forms {
    ...Form
  }
}
    ${FormFragmentDoc}`;

/**
 * __useFormsQuery__
 *
 * To run a query within a React component, call `useFormsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFormsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFormsQuery({
 *   variables: {
 *   },
 * });
 */
export function useFormsQuery(baseOptions?: Apollo.QueryHookOptions<FormsQuery, FormsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FormsQuery, FormsQueryVariables>(FormsDocument, options);
      }
export function useFormsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormsQuery, FormsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FormsQuery, FormsQueryVariables>(FormsDocument, options);
        }
export type FormsQueryHookResult = ReturnType<typeof useFormsQuery>;
export type FormsLazyQueryHookResult = ReturnType<typeof useFormsLazyQuery>;
export type FormsQueryResult = Apollo.QueryResult<FormsQuery, FormsQueryVariables>;
export const FormDocument = gql`
    query Form($formId: String!) {
  Form(id: $formId) {
    message
    status
    data {
      ...Form
    }
  }
}
    ${FormFragmentDoc}`;

/**
 * __useFormQuery__
 *
 * To run a query within a React component, call `useFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFormQuery({
 *   variables: {
 *      formId: // value for 'formId'
 *   },
 * });
 */
export function useFormQuery(baseOptions: Apollo.QueryHookOptions<FormQuery, FormQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FormQuery, FormQueryVariables>(FormDocument, options);
      }
export function useFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FormQuery, FormQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FormQuery, FormQueryVariables>(FormDocument, options);
        }
export type FormQueryHookResult = ReturnType<typeof useFormQuery>;
export type FormLazyQueryHookResult = ReturnType<typeof useFormLazyQuery>;
export type FormQueryResult = Apollo.QueryResult<FormQuery, FormQueryVariables>;
export const EntriesDocument = gql`
    query Entries($page: Int, $pageSize: Int, $skip: Int, $search: String) {
  Entries(page: $page, pageSize: $pageSize, skip: $skip, search: $search) {
    total
    data {
      ...Entry
    }
  }
}
    ${EntryFragmentDoc}`;

/**
 * __useEntriesQuery__
 *
 * To run a query within a React component, call `useEntriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntriesQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      skip: // value for 'skip'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useEntriesQuery(baseOptions?: Apollo.QueryHookOptions<EntriesQuery, EntriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntriesQuery, EntriesQueryVariables>(EntriesDocument, options);
      }
export function useEntriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntriesQuery, EntriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntriesQuery, EntriesQueryVariables>(EntriesDocument, options);
        }
export type EntriesQueryHookResult = ReturnType<typeof useEntriesQuery>;
export type EntriesLazyQueryHookResult = ReturnType<typeof useEntriesLazyQuery>;
export type EntriesQueryResult = Apollo.QueryResult<EntriesQuery, EntriesQueryVariables>;
export const EntryDocument = gql`
    query Entry($entryId: String!) {
  Entry(entryId: $entryId) {
    message
    status
    data {
      ...Entry
    }
  }
}
    ${EntryFragmentDoc}`;

/**
 * __useEntryQuery__
 *
 * To run a query within a React component, call `useEntryQuery` and pass it any options that fit your needs.
 * When your component renders, `useEntryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEntryQuery({
 *   variables: {
 *      entryId: // value for 'entryId'
 *   },
 * });
 */
export function useEntryQuery(baseOptions: Apollo.QueryHookOptions<EntryQuery, EntryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EntryQuery, EntryQueryVariables>(EntryDocument, options);
      }
export function useEntryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EntryQuery, EntryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EntryQuery, EntryQueryVariables>(EntryDocument, options);
        }
export type EntryQueryHookResult = ReturnType<typeof useEntryQuery>;
export type EntryLazyQueryHookResult = ReturnType<typeof useEntryLazyQuery>;
export type EntryQueryResult = Apollo.QueryResult<EntryQuery, EntryQueryVariables>;
export const OrdersDocument = gql`
    query Orders($page: Int, $pageSize: Int, $skip: Int, $search: String) {
  Orders(page: $page, pageSize: $pageSize, skip: $skip, search: $search) {
    total
    data {
      ...Order
    }
  }
}
    ${OrderFragmentDoc}`;

/**
 * __useOrdersQuery__
 *
 * To run a query within a React component, call `useOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      skip: // value for 'skip'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useOrdersQuery(baseOptions?: Apollo.QueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
      }
export function useOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
        }
export type OrdersQueryHookResult = ReturnType<typeof useOrdersQuery>;
export type OrdersLazyQueryHookResult = ReturnType<typeof useOrdersLazyQuery>;
export type OrdersQueryResult = Apollo.QueryResult<OrdersQuery, OrdersQueryVariables>;
export const CartDocument = gql`
    query Cart {
  Cart {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;

/**
 * __useCartQuery__
 *
 * To run a query within a React component, call `useCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useCartQuery(baseOptions?: Apollo.QueryHookOptions<CartQuery, CartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CartQuery, CartQueryVariables>(CartDocument, options);
      }
export function useCartLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CartQuery, CartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CartQuery, CartQueryVariables>(CartDocument, options);
        }
export type CartQueryHookResult = ReturnType<typeof useCartQuery>;
export type CartLazyQueryHookResult = ReturnType<typeof useCartLazyQuery>;
export type CartQueryResult = Apollo.QueryResult<CartQuery, CartQueryVariables>;
export const CompletedOrdersDocument = gql`
    query CompletedOrders($page: Int, $pageSize: Int, $skip: Int, $search: String) {
  CompletedOrders(page: $page, pageSize: $pageSize, skip: $skip, search: $search) {
    total
    data {
      ...Order
    }
  }
}
    ${OrderFragmentDoc}`;

/**
 * __useCompletedOrdersQuery__
 *
 * To run a query within a React component, call `useCompletedOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompletedOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompletedOrdersQuery({
 *   variables: {
 *      page: // value for 'page'
 *      pageSize: // value for 'pageSize'
 *      skip: // value for 'skip'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useCompletedOrdersQuery(baseOptions?: Apollo.QueryHookOptions<CompletedOrdersQuery, CompletedOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompletedOrdersQuery, CompletedOrdersQueryVariables>(CompletedOrdersDocument, options);
      }
export function useCompletedOrdersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompletedOrdersQuery, CompletedOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompletedOrdersQuery, CompletedOrdersQueryVariables>(CompletedOrdersDocument, options);
        }
export type CompletedOrdersQueryHookResult = ReturnType<typeof useCompletedOrdersQuery>;
export type CompletedOrdersLazyQueryHookResult = ReturnType<typeof useCompletedOrdersLazyQuery>;
export type CompletedOrdersQueryResult = Apollo.QueryResult<CompletedOrdersQuery, CompletedOrdersQueryVariables>;
export const OrderByOrderNumberDocument = gql`
    query OrderByOrderNumber($orderNumber: Float!) {
  OrderByOrderNumber(orderNumber: $orderNumber) {
    message
    status
    data {
      ...Order
    }
  }
}
    ${OrderFragmentDoc}`;

/**
 * __useOrderByOrderNumberQuery__
 *
 * To run a query within a React component, call `useOrderByOrderNumberQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderByOrderNumberQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderByOrderNumberQuery({
 *   variables: {
 *      orderNumber: // value for 'orderNumber'
 *   },
 * });
 */
export function useOrderByOrderNumberQuery(baseOptions: Apollo.QueryHookOptions<OrderByOrderNumberQuery, OrderByOrderNumberQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderByOrderNumberQuery, OrderByOrderNumberQueryVariables>(OrderByOrderNumberDocument, options);
      }
export function useOrderByOrderNumberLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderByOrderNumberQuery, OrderByOrderNumberQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderByOrderNumberQuery, OrderByOrderNumberQueryVariables>(OrderByOrderNumberDocument, options);
        }
export type OrderByOrderNumberQueryHookResult = ReturnType<typeof useOrderByOrderNumberQuery>;
export type OrderByOrderNumberLazyQueryHookResult = ReturnType<typeof useOrderByOrderNumberLazyQuery>;
export type OrderByOrderNumberQueryResult = Apollo.QueryResult<OrderByOrderNumberQuery, OrderByOrderNumberQueryVariables>;