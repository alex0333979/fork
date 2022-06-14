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
  address2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  postalCode: Scalars['String'];
  state?: Maybe<Scalars['String']>;
};

export type BillingAddressInput = {
  address1: Scalars['String'];
  address2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  postalCode: Scalars['String'];
  state?: Maybe<Scalars['String']>;
};

export type BillingAddressResponse = {
  data?: Maybe<BillingAddress>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Cart = {
  billingAddress?: Maybe<BillingAddress>;
  defaultCurrency?: Maybe<Currency>;
  items?: Maybe<Array<CartItem>>;
  promoCode?: Maybe<Scalars['String']>;
  shippingAddress?: Maybe<ShippingAddress>;
  shippingType: ShippingType;
};

export type CartItem = {
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  isComplete: Scalars['Boolean'];
  name: Scalars['String'];
  productCategory?: Maybe<ProductCategory>;
  productId: Scalars['ID'];
  productSku?: Maybe<ProductSku>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CartItemInput = {
  description: Scalars['String'];
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  productCategory?: Maybe<ProductCategory>;
  productId: Scalars['ID'];
  productSku: ProductSku;
};

export type CartResponse = {
  data?: Maybe<Cart>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type CheckPhotoResponse = {
  data?: Maybe<TestResult>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export enum Code {
  Code200 = 'Code200',
  Code400 = 'Code400',
  Code500 = 'Code500'
}

export type CountriesResponse = {
  data: Array<Country>;
  total: Scalars['Float'];
};

export type Country = {
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type CurrenciesResponse = {
  data: Array<Currency>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Currency = {
  code: CurrencyCode;
  label: CurrencyType;
  symbol: Scalars['String'];
};

export enum CurrencyCode {
  Eu = 'eu',
  Gb = 'gb',
  Us = 'us'
}

export type CurrencyInput = {
  code: CurrencyCode;
  label: CurrencyType;
  symbol: Scalars['String'];
};

export enum CurrencyType {
  Eur = 'EUR',
  Gbp = 'GBP',
  Usd = 'USD'
}

export type Dictionary = {
  message?: Maybe<Scalars['String']>;
  test?: Maybe<Scalars['String']>;
};

export type Dimensions = {
  height?: Maybe<Scalars['Float']>;
  unit?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
};

export type EmailToAdminInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
  question: Scalars['String'];
};

export type Entry = {
  completeStep: Scalars['Int'];
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

export type Eye = {
  position: Position;
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
  hidden?: Maybe<Scalars['Boolean']>;
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
  hidden?: Maybe<Scalars['Boolean']>;
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

export enum FulfillmentCenter {
  Europe = 'Europe',
  Us = 'US'
}

export type Head = {
  Dimensions?: Maybe<Dimensions>;
  position?: Maybe<Position>;
};

export type Mutation = {
  AddBillingAddressToCart: CartResponse;
  AddItemsToCart: CartResponse;
  AddPromoCodeToCart: CartResponse;
  AddShippingAddressToCart: CartResponse;
  CheckPhoto: CheckPhotoResponse;
  ClearCart: CartResponse;
  CreateGuest: TokenResponse;
  CreateOrder: OrderResponse;
  DeleteOrder: StringResponse;
  GetPaymentIntent: PaymentIntentResponse;
  Login: TokenResponse;
  RemoveItemsFromCart: CartResponse;
  SendEmailToAdmin: StringResponse;
  SendOTP: OrderEditResponse;
  SendOrderConfirmToFulfillmentManually: StringResponse;
  SendOrderConfirmToUserManually: StringResponse;
  SendOrderEditRequest: StringResponse;
  SetDefaultBillingAddress: BillingAddressResponse;
  SetDefaultCurrency: CartResponse;
  SetDefaultShippingAddress: ShippingAddressResponse;
  SetShippingTypeToCart: CartResponse;
  SetTrackingNumber: OrderResponse;
  SignUp: UserResponse;
  SubmitEntry: EntryResponse;
  UpdateCartItemPrice: CartResponse;
  UpdateEntryPhoto: EntryResponse;
  UpdateOrderPhoto: StringResponse;
  UpdateOrderStatus: OrderResponse;
  VerifyOTP: OrderEditResponse;
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


export type MutationCheckPhotoArgs = {
  entryId: Scalars['String'];
  imageResolution: Scalars['String'];
  userAgent: Scalars['String'];
};


export type MutationDeleteOrderArgs = {
  orderId: Scalars['String'];
};


export type MutationGetPaymentIntentArgs = {
  currency: Scalars['String'];
  orderId: Scalars['String'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRemoveItemsFromCartArgs = {
  ids: Array<Scalars['ID']>;
};


export type MutationSendEmailToAdminArgs = {
  data: EmailToAdminInput;
};


export type MutationSendOtpArgs = {
  accessToken: Scalars['String'];
  email: Scalars['String'];
};


export type MutationSendOrderConfirmToFulfillmentManuallyArgs = {
  orderId: Scalars['String'];
};


export type MutationSendOrderConfirmToUserManuallyArgs = {
  orderId: Scalars['String'];
};


export type MutationSendOrderEditRequestArgs = {
  orderId: Scalars['String'];
};


export type MutationSetDefaultBillingAddressArgs = {
  billingAddress: BillingAddressInput;
};


export type MutationSetDefaultCurrencyArgs = {
  currency: CurrencyInput;
};


export type MutationSetDefaultShippingAddressArgs = {
  shippingAddress: ShippingAddressInput;
};


export type MutationSetShippingTypeToCartArgs = {
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


export type MutationUpdateCartItemPriceArgs = {
  item: UpdateCartItemPriceInput;
};


export type MutationUpdateEntryPhotoArgs = {
  editToken: Scalars['String'];
  imageUrl: Scalars['String'];
};


export type MutationUpdateOrderPhotoArgs = {
  editToken: Scalars['String'];
  imageUrl: Scalars['String'];
};


export type MutationUpdateOrderStatusArgs = {
  orderId: Scalars['String'];
  orderStatus: OrderStatus;
  orderStatusType: OrderStatusType;
};


export type MutationVerifyOtpArgs = {
  accessToken: Scalars['String'];
  otp: Scalars['String'];
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
  billingAddress: BillingAddress;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  items: Array<CartItem>;
  orderNumber: Scalars['Int'];
  paymentStatus: PaymentStatus;
  promoCode?: Maybe<Scalars['String']>;
  shipStation?: Maybe<OrderShipStation>;
  shippingAddress?: Maybe<ShippingAddress>;
  shippingType: ShippingType;
  skus?: Maybe<Array<Scalars['String']>>;
  status: OrderTrack;
  totalPrice: Scalars['Float'];
  trackingNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
  userId: Scalars['ID'];
};

export type OrderEditRes = {
  authToken?: Maybe<Scalars['String']>;
  editToken?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type OrderEditResponse = {
  data?: Maybe<OrderEditRes>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
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

export type OrderShipStation = {
  fulfillmentCenter: FulfillmentCenter;
  orderId: Scalars['Int'];
  status?: Maybe<Array<ShipStationStatus>>;
  trackingNumber?: Maybe<Scalars['String']>;
};

export enum OrderStatus {
  Completed = 'COMPLETED',
  NotStarted = 'NOT_STARTED',
  OnProgress = 'ON_PROGRESS',
  Pending = 'PENDING'
}

export enum OrderStatusType {
  ConfirmOrder = 'confirmOrder',
  Delivered = 'delivered',
  OutForDelivery = 'outForDelivery',
  ProductPrepared = 'productPrepared',
  Shipped = 'shipped'
}

export type OrderTrack = {
  confirmOrder: TrackStep;
  delivered: TrackStep;
  outForDelivery: TrackStep;
  productPrepared: TrackStep;
  shipped: TrackStep;
};

export type PDocument = {
  background?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  dimensions?: Maybe<Dimensions>;
  dpi?: Maybe<Scalars['Int']>;
  head?: Maybe<Head>;
  id?: Maybe<Scalars['Int']>;
  size?: Maybe<Size>;
  type?: Maybe<Scalars['String']>;
};

export type PDocumentResponse = {
  data?: Maybe<PDocument>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type PDocumentsResponse = {
  data: Array<PDocument>;
  total: Scalars['Float'];
};

export type PaymentIntent = {
  clientSecret: Scalars['String'];
};

export type PaymentIntentResponse = {
  data?: Maybe<PaymentIntent>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export enum PaymentStatus {
  Completed = 'COMPLETED',
  Pending = 'PENDING'
}

export type Position = {
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  unit?: Maybe<Unit>;
};

export type Product = {
  category: ProductCategory;
  currency: Currency;
  description?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  sku: ProductSku;
};

export enum ProductCategory {
  Application = 'Application',
  Photo = 'Photo',
  Shipping = 'Shipping',
  Upsell = 'Upsell'
}

export enum ProductSku {
  Application = 'Application',
  ExpeditedShipping = 'ExpeditedShipping',
  FourPhotos = 'FourPhotos',
  Free = 'Free',
  PrintShipService = 'PrintShipService',
  PriorityService = 'PriorityService',
  SixPhotos = 'SixPhotos',
  StandardShipping = 'StandardShipping',
  TwoPhotos = 'TwoPhotos',
  Upsell = 'Upsell'
}

export type ProductsResponse = {
  data: Array<Product>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Query = {
  Cart: CartResponse;
  CompletedOrders: OrderPaginatedResponse;
  Countries: CountriesResponse;
  Currencies: CurrenciesResponse;
  Document: PDocumentResponse;
  DocumentsByCountry: PDocumentsResponse;
  Entries: EntryPaginatedResponse;
  Entry: EntryResponse;
  Form: FormResponse;
  Forms: Array<Form>;
  GetSignedUrl: SignedUrlResponse;
  Me: UserResponse;
  Order: OrderResponse;
  OrderByOrderNumber: OrderResponse;
  Orders: OrderPaginatedResponse;
  OrdersForAdmin: OrderPaginatedResponse;
  Products: ProductsResponse;
};


export type QueryCompletedOrdersArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryDocumentArgs = {
  id: Scalars['String'];
};


export type QueryDocumentsByCountryArgs = {
  country: Scalars['String'];
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


export type QueryOrderArgs = {
  orderId: Scalars['String'];
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


export type QueryOrdersForAdminArgs = {
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
  skip?: Maybe<Scalars['Int']>;
};


export type QueryProductsArgs = {
  currencyCode?: Maybe<CurrencyCode>;
};

export type ShipStationStatus = {
  date: Scalars['String'];
  status: Scalars['String'];
};

export type ShippingAddress = {
  address1: Scalars['String'];
  address2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  postalCode: Scalars['String'];
  state?: Maybe<Scalars['String']>;
};

export type ShippingAddressInput = {
  address1: Scalars['String'];
  address2?: Maybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  postalCode: Scalars['String'];
  state?: Maybe<Scalars['String']>;
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
  From3To6 = 'FROM3TO6',
  NoShipping = 'NO_SHIPPING'
}

export type SignedUrl = {
  signedUrl: Scalars['String'];
  url: Scalars['String'];
};

export type SignedUrlResponse = {
  data?: Maybe<SignedUrl>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Size = {
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
};

export type StringResponse = {
  data?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type TestResult = {
  code?: Maybe<Code>;
  failed?: Maybe<Array<Dictionary>>;
  message?: Maybe<Scalars['String']>;
  passed?: Maybe<Array<Dictionary>>;
};

export type Token = {
  accessToken: Scalars['String'];
};

export type TokenResponse = {
  data?: Maybe<Token>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type TrackStep = {
  status: OrderStatus;
  updatedAt: Scalars['DateTime'];
};

export enum Unit {
  Inch = 'Inch',
  Mm = 'Mm',
  Percentage = 'Percentage'
}

export type UpdateCartItemPriceInput = {
  itemId: Scalars['ID'];
  productSku: ProductSku;
};

export type User = {
  billingAddress?: Maybe<BillingAddress>;
  cart?: Maybe<Cart>;
  createdAt: Scalars['DateTime'];
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  guest: Scalars['Boolean'];
  id: Scalars['ID'];
  isAdmin: Scalars['Boolean'];
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

export type ValidatedImage = {
  image?: Maybe<Scalars['String']>;
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

export type CurrencyFragment = { __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string };

export type ProductFragment = { __typename: 'Product', sku: ProductSku, price: number, category: ProductCategory, description?: Maybe<string>, currency: { __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string } };

export type BillingAddressFragment = { __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string };

export type ShippingAddressFragment = { __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string };

export type CartItemFragment = { __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> };

export type CartFragment = { __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> };

export type UserFragment = { __typename: 'User', id: string, email?: Maybe<string>, firstName?: Maybe<string>, lastName?: Maybe<string>, phone?: Maybe<string>, guest: boolean, isAdmin: boolean, createdAt: any, updatedAt: any, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, cart?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> }> };

export type OptionFragment = { __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any };

export type ValidationFragment = { __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> };

export type FormFieldFragment = { __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, hidden?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> };

export type FormStepFragment = { __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, hidden?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> };

export type FormFragment = { __typename: 'Form', id: string, name: string, description: string, steps: Array<{ __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, hidden?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> }> };

export type EntryFragment = { __typename: 'Entry', id: string, userId: string, currentStep: number, completeStep: number, isComplete: boolean, formId: string, createdAt: any, updatedAt: any, form: { __typename: 'Form', id: string, name: string, description: string, steps: Array<{ __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, hidden?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> }> } };

export type TrackStepFragment = { __typename: 'TrackStep', status: OrderStatus, updatedAt: any };

export type OrderTrackFragment = { __typename: 'OrderTrack', confirmOrder: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, productPrepared: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, shipped: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, outForDelivery: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, delivered: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any } };

export type OrderFragment = { __typename: 'Order', id: string, paymentStatus: PaymentStatus, userId: string, totalPrice: number, promoCode?: Maybe<string>, orderNumber: number, shippingType: ShippingType, trackingNumber?: Maybe<string>, createdAt: any, updatedAt: any, items: Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>, billingAddress: { __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, status: { __typename: 'OrderTrack', confirmOrder: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, productPrepared: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, shipped: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, outForDelivery: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, delivered: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any } } };

export type SignedUrlFragment = { __typename: 'SignedUrl', url: string, signedUrl: string };

export type TestResultFragment = { __typename: 'TestResult', message?: Maybe<string>, code?: Maybe<Code>, failed?: Maybe<Array<{ __typename: 'Dictionary', test?: Maybe<string>, message?: Maybe<string> }>>, passed?: Maybe<Array<{ __typename: 'Dictionary', test?: Maybe<string>, message?: Maybe<string> }>> };

export type CountryFragment = { __typename: 'Country', id?: Maybe<number>, country?: Maybe<string>, type?: Maybe<string>, countryCode?: Maybe<string> };

export type PDocumentFragment = { __typename: 'PDocument', id?: Maybe<number>, country?: Maybe<string>, type?: Maybe<string>, countryCode?: Maybe<string>, background?: Maybe<string>, dpi?: Maybe<number>, dimensions?: Maybe<{ __typename: 'Dimensions', height?: Maybe<number>, unit?: Maybe<string>, width?: Maybe<number> }>, size?: Maybe<{ __typename: 'Size', max?: Maybe<number>, min?: Maybe<number> }>, head?: Maybe<{ __typename: 'Head', Dimensions?: Maybe<{ __typename: 'Dimensions', height?: Maybe<number>, unit?: Maybe<string>, width?: Maybe<number> }>, position?: Maybe<{ __typename: 'Position', max?: Maybe<number>, min?: Maybe<number>, unit?: Maybe<Unit> }> }> };

export type CreateGuestMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateGuestMutation = { __typename: 'Mutation', CreateGuest: { __typename: 'TokenResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Token', accessToken: string }> } };

export type SignUpMutationVariables = Exact<{
  user: UserInput;
}>;


export type SignUpMutation = { __typename: 'Mutation', SignUp: { __typename: 'UserResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'User', id: string, email?: Maybe<string>, firstName?: Maybe<string>, lastName?: Maybe<string>, phone?: Maybe<string>, guest: boolean, isAdmin: boolean, createdAt: any, updatedAt: any, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, cart?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> }> }> } };

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename: 'Mutation', Login: { __typename: 'TokenResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Token', accessToken: string }> } };

export type SetDefaultBillingAddressMutationVariables = Exact<{
  billingAddress: BillingAddressInput;
}>;


export type SetDefaultBillingAddressMutation = { __typename: 'Mutation', SetDefaultBillingAddress: { __typename: 'BillingAddressResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }> } };

export type SetDefaultShippingAddressMutationVariables = Exact<{
  shippingAddress: ShippingAddressInput;
}>;


export type SetDefaultShippingAddressMutation = { __typename: 'Mutation', SetDefaultShippingAddress: { __typename: 'ShippingAddressResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }> } };

export type SetDefaultCurrencyMutationVariables = Exact<{
  currency: CurrencyInput;
}>;


export type SetDefaultCurrencyMutation = { __typename: 'Mutation', SetDefaultCurrency: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> }> } };

export type SetTrackingNumberMutationVariables = Exact<{
  trackingNumber: Scalars['String'];
  orderId: Scalars['String'];
}>;


export type SetTrackingNumberMutation = { __typename: 'Mutation', SetTrackingNumber: { __typename: 'OrderResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Order', id: string, paymentStatus: PaymentStatus, userId: string, totalPrice: number, promoCode?: Maybe<string>, orderNumber: number, shippingType: ShippingType, trackingNumber?: Maybe<string>, createdAt: any, updatedAt: any, items: Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>, billingAddress: { __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, status: { __typename: 'OrderTrack', confirmOrder: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, productPrepared: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, shipped: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, outForDelivery: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, delivered: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any } } }> } };

export type SubmitEntryMutationVariables = Exact<{
  entryId?: Maybe<Scalars['ID']>;
  formId: Scalars['ID'];
  formStep: FormStepInput;
}>;


export type SubmitEntryMutation = { __typename: 'Mutation', SubmitEntry: { __typename: 'EntryResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Entry', id: string, userId: string, currentStep: number, isComplete: boolean, formId: string, createdAt: any, updatedAt: any, form: { __typename: 'Form', id: string, name: string, description: string, steps: Array<{ __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, hidden?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> }> } }> } };

export type AddItemsToCartMutationVariables = Exact<{
  cartItems: Array<CartItemInput> | CartItemInput;
}>;


export type AddItemsToCartMutation = { __typename: 'Mutation', AddItemsToCart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> }> } };

export type ClearCartMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearCartMutation = { __typename: 'Mutation', ClearCart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> }> } };

export type RemoveItemsFromCartMutationVariables = Exact<{
  ids: Array<Scalars['ID']> | Scalars['ID'];
}>;


export type RemoveItemsFromCartMutation = { __typename: 'Mutation', RemoveItemsFromCart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> }> } };

export type AddShippingAddressToCartMutationVariables = Exact<{
  shippingAddress: ShippingAddressInput;
}>;


export type AddShippingAddressToCartMutation = { __typename: 'Mutation', AddShippingAddressToCart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> }> } };

export type AddBillingAddressToCartMutationVariables = Exact<{
  billingAddress: BillingAddressInput;
}>;


export type AddBillingAddressToCartMutation = { __typename: 'Mutation', AddBillingAddressToCart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> }> } };

export type SetShippingTypeToCartMutationVariables = Exact<{
  shippingType: Scalars['String'];
}>;


export type SetShippingTypeToCartMutation = { __typename: 'Mutation', SetShippingTypeToCart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> }> } };

export type AddPromoCodeToCartMutationVariables = Exact<{
  promoCode: Scalars['String'];
}>;


export type AddPromoCodeToCartMutation = { __typename: 'Mutation', AddPromoCodeToCart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> }> } };

export type CreateOrderMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateOrderMutation = { __typename: 'Mutation', CreateOrder: { __typename: 'OrderResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Order', id: string, paymentStatus: PaymentStatus, userId: string, totalPrice: number, promoCode?: Maybe<string>, orderNumber: number, shippingType: ShippingType, trackingNumber?: Maybe<string>, createdAt: any, updatedAt: any, items: Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>, billingAddress: { __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, status: { __typename: 'OrderTrack', confirmOrder: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, productPrepared: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, shipped: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, outForDelivery: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, delivered: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any } } }> } };

export type GetPaymentIntentMutationVariables = Exact<{
  orderId: Scalars['String'];
  currency: Scalars['String'];
}>;


export type GetPaymentIntentMutation = { __typename: 'Mutation', GetPaymentIntent: { __typename: 'PaymentIntentResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'PaymentIntent', clientSecret: string }> } };

export type CheckPhotoMutationVariables = Exact<{
  userAgent: Scalars['String'];
  imageResolution: Scalars['String'];
  entryId: Scalars['String'];
}>;


export type CheckPhotoMutation = { __typename: 'Mutation', CheckPhoto: { __typename: 'CheckPhotoResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'TestResult', message?: Maybe<string>, code?: Maybe<Code>, failed?: Maybe<Array<{ __typename: 'Dictionary', test?: Maybe<string>, message?: Maybe<string> }>>, passed?: Maybe<Array<{ __typename: 'Dictionary', test?: Maybe<string>, message?: Maybe<string> }>> }> } };

export type SendEmailToAdminMutationVariables = Exact<{
  data: EmailToAdminInput;
}>;


export type SendEmailToAdminMutation = { __typename: 'Mutation', SendEmailToAdmin: { __typename: 'StringResponse', status: boolean, message: string, data?: Maybe<string> } };

export type UpdateCartItemPriceMutationVariables = Exact<{
  item: UpdateCartItemPriceInput;
}>;


export type UpdateCartItemPriceMutation = { __typename: 'Mutation', UpdateCartItemPrice: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> }> } };

export type SendOtpMutationVariables = Exact<{
  accessToken: Scalars['String'];
  email: Scalars['String'];
}>;


export type SendOtpMutation = { __typename: 'Mutation', SendOTP: { __typename: 'OrderEditResponse', message: string, status: boolean } };

export type VerifyOtpMutationVariables = Exact<{
  accessToken: Scalars['String'];
  otp: Scalars['String'];
}>;


export type VerifyOtpMutation = { __typename: 'Mutation', VerifyOTP: { __typename: 'OrderEditResponse', status: boolean, message: string, data?: Maybe<{ __typename: 'OrderEditRes', authToken?: Maybe<string>, editToken?: Maybe<string>, imageUrl?: Maybe<string>, user?: Maybe<{ __typename: 'User', id: string, email?: Maybe<string>, firstName?: Maybe<string>, lastName?: Maybe<string>, phone?: Maybe<string>, guest: boolean, isAdmin: boolean, createdAt: any, updatedAt: any, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, cart?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> }> }> }> } };

export type UpdateEntryPhotoMutationVariables = Exact<{
  imageUrl: Scalars['String'];
  editToken: Scalars['String'];
}>;


export type UpdateEntryPhotoMutation = { __typename: 'Mutation', UpdateEntryPhoto: { __typename: 'EntryResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Entry', id: string }> } };

export type UpdateOrderPhotoMutationVariables = Exact<{
  imageUrl: Scalars['String'];
  editToken: Scalars['String'];
}>;


export type UpdateOrderPhotoMutation = { __typename: 'Mutation', UpdateOrderPhoto: { __typename: 'StringResponse', message: string, status: boolean } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename: 'Query', Me: { __typename: 'UserResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'User', id: string, email?: Maybe<string>, firstName?: Maybe<string>, lastName?: Maybe<string>, phone?: Maybe<string>, guest: boolean, isAdmin: boolean, createdAt: any, updatedAt: any, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, cart?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> }> }> } };

export type FormsQueryVariables = Exact<{ [key: string]: never; }>;


export type FormsQuery = { __typename: 'Query', Forms: Array<{ __typename: 'Form', id: string, name: string, description: string, steps: Array<{ __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, hidden?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> }> }> };

export type FormQueryVariables = Exact<{
  formId: Scalars['String'];
}>;


export type FormQuery = { __typename: 'Query', Form: { __typename: 'FormResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Form', id: string, name: string, description: string, steps: Array<{ __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, hidden?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> }> }> } };

export type EntriesQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
}>;


export type EntriesQuery = { __typename: 'Query', Entries: { __typename: 'EntryPaginatedResponse', total: number, data: Array<{ __typename: 'Entry', id: string, userId: string, currentStep: number, completeStep: number, isComplete: boolean, formId: string, createdAt: any, updatedAt: any, form: { __typename: 'Form', id: string, name: string, description: string, steps: Array<{ __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, hidden?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> }> } }> } };

export type EntryQueryVariables = Exact<{
  entryId: Scalars['String'];
}>;


export type EntryQuery = { __typename: 'Query', Entry: { __typename: 'EntryResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Entry', id: string, userId: string, currentStep: number, completeStep: number, isComplete: boolean, formId: string, createdAt: any, updatedAt: any, form: { __typename: 'Form', id: string, name: string, description: string, steps: Array<{ __typename: 'FormStep', name: string, step: number, notes?: Maybe<string>, fields: Array<{ __typename: 'FormField', index?: Maybe<number>, name: string, type: FieldType, text?: Maybe<string>, required?: Maybe<boolean>, value?: Maybe<any>, defaultValue?: Maybe<any>, disabled?: Maybe<boolean>, hidden?: Maybe<boolean>, notes?: Maybe<string>, placeholder?: Maybe<string>, options?: Maybe<Array<{ __typename: 'Option', notes?: Maybe<string>, text?: Maybe<string>, value: any }>>, validations?: Maybe<Array<{ __typename: 'Validation', message?: Maybe<string>, type: ValidationType, value?: Maybe<number> }>> }> }> } }> } };

export type OrdersQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
}>;


export type OrdersQuery = { __typename: 'Query', Orders: { __typename: 'OrderPaginatedResponse', total: number, data: Array<{ __typename: 'Order', id: string, paymentStatus: PaymentStatus, userId: string, totalPrice: number, promoCode?: Maybe<string>, orderNumber: number, shippingType: ShippingType, trackingNumber?: Maybe<string>, createdAt: any, updatedAt: any, items: Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>, billingAddress: { __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, status: { __typename: 'OrderTrack', confirmOrder: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, productPrepared: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, shipped: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, outForDelivery: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, delivered: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any } } }> } };

export type CartQueryVariables = Exact<{ [key: string]: never; }>;


export type CartQuery = { __typename: 'Query', Cart: { __typename: 'CartResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Cart', promoCode?: Maybe<string>, shippingType: ShippingType, defaultCurrency?: Maybe<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }>, billingAddress?: Maybe<{ __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, items?: Maybe<Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>> }> } };

export type CompletedOrdersQueryVariables = Exact<{
  page?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
  search?: Maybe<Scalars['String']>;
}>;


export type CompletedOrdersQuery = { __typename: 'Query', CompletedOrders: { __typename: 'OrderPaginatedResponse', total: number, data: Array<{ __typename: 'Order', id: string, paymentStatus: PaymentStatus, userId: string, totalPrice: number, promoCode?: Maybe<string>, orderNumber: number, shippingType: ShippingType, trackingNumber?: Maybe<string>, createdAt: any, updatedAt: any, items: Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>, billingAddress: { __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, status: { __typename: 'OrderTrack', confirmOrder: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, productPrepared: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, shipped: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, outForDelivery: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, delivered: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any } } }> } };

export type OrderByOrderNumberQueryVariables = Exact<{
  orderNumber: Scalars['Float'];
}>;


export type OrderByOrderNumberQuery = { __typename: 'Query', OrderByOrderNumber: { __typename: 'OrderResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Order', id: string, paymentStatus: PaymentStatus, userId: string, totalPrice: number, promoCode?: Maybe<string>, orderNumber: number, shippingType: ShippingType, trackingNumber?: Maybe<string>, createdAt: any, updatedAt: any, items: Array<{ __typename: 'CartItem', id: string, productId: string, name: string, description: string, imageUrl?: Maybe<string>, productCategory?: Maybe<ProductCategory>, productSku?: Maybe<ProductSku>, isComplete: boolean, createdAt?: Maybe<any>, updatedAt?: Maybe<any> }>, billingAddress: { __typename: 'BillingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }, shippingAddress?: Maybe<{ __typename: 'ShippingAddress', address1: string, address2?: Maybe<string>, city: string, country: string, firstName: string, lastName: string, postalCode: string, state?: Maybe<string>, email: string, phone: string }>, status: { __typename: 'OrderTrack', confirmOrder: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, productPrepared: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, shipped: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, outForDelivery: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any }, delivered: { __typename: 'TrackStep', status: OrderStatus, updatedAt: any } } }> } };

export type OrderSkusQueryVariables = Exact<{
  orderNumber: Scalars['Float'];
}>;


export type OrderSkusQuery = { __typename: 'Query', OrderByOrderNumber: { __typename: 'OrderResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'Order', skus?: Maybe<Array<string>> }> } };

export type GetSignedUrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSignedUrlQuery = { __typename: 'Query', GetSignedUrl: { __typename: 'SignedUrlResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'SignedUrl', url: string, signedUrl: string }> } };

export type CountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesQuery = { __typename: 'Query', Countries: { __typename: 'CountriesResponse', total: number, data: Array<{ __typename: 'Country', id?: Maybe<number>, country?: Maybe<string>, type?: Maybe<string>, countryCode?: Maybe<string> }> } };

export type DocumentsByCountryQueryVariables = Exact<{
  country: Scalars['String'];
}>;


export type DocumentsByCountryQuery = { __typename: 'Query', DocumentsByCountry: { __typename: 'PDocumentsResponse', total: number, data: Array<{ __typename: 'PDocument', id?: Maybe<number>, country?: Maybe<string>, type?: Maybe<string>, countryCode?: Maybe<string>, background?: Maybe<string>, dpi?: Maybe<number>, dimensions?: Maybe<{ __typename: 'Dimensions', height?: Maybe<number>, unit?: Maybe<string>, width?: Maybe<number> }>, size?: Maybe<{ __typename: 'Size', max?: Maybe<number>, min?: Maybe<number> }>, head?: Maybe<{ __typename: 'Head', Dimensions?: Maybe<{ __typename: 'Dimensions', height?: Maybe<number>, unit?: Maybe<string>, width?: Maybe<number> }>, position?: Maybe<{ __typename: 'Position', max?: Maybe<number>, min?: Maybe<number>, unit?: Maybe<Unit> }> }> }> } };

export type DocumentQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type DocumentQuery = { __typename: 'Query', Document: { __typename: 'PDocumentResponse', message: string, status: boolean, data?: Maybe<{ __typename: 'PDocument', id?: Maybe<number>, country?: Maybe<string>, type?: Maybe<string>, countryCode?: Maybe<string>, background?: Maybe<string>, dpi?: Maybe<number>, dimensions?: Maybe<{ __typename: 'Dimensions', height?: Maybe<number>, unit?: Maybe<string>, width?: Maybe<number> }>, size?: Maybe<{ __typename: 'Size', max?: Maybe<number>, min?: Maybe<number> }>, head?: Maybe<{ __typename: 'Head', Dimensions?: Maybe<{ __typename: 'Dimensions', height?: Maybe<number>, unit?: Maybe<string>, width?: Maybe<number> }>, position?: Maybe<{ __typename: 'Position', max?: Maybe<number>, min?: Maybe<number>, unit?: Maybe<Unit> }> }> }> } };

export type ProductsQueryVariables = Exact<{
  currencyCode?: Maybe<CurrencyCode>;
}>;


export type ProductsQuery = { __typename: 'Query', Products: { __typename: 'ProductsResponse', message: string, status: boolean, data: Array<{ __typename: 'Product', sku: ProductSku, price: number, category: ProductCategory, description?: Maybe<string>, currency: { __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string } }> } };

export type CurrenciesQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrenciesQuery = { __typename: 'Query', Currencies: { __typename: 'CurrenciesResponse', message: string, status: boolean, data: Array<{ __typename: 'Currency', label: CurrencyType, code: CurrencyCode, symbol: string }> } };

export const CurrencyFragmentDoc = gql`
    fragment Currency on Currency {
  label
  code
  symbol
}
    `;
export const ProductFragmentDoc = gql`
    fragment Product on Product {
  sku
  price
  currency {
    ...Currency
  }
  category
  description
}
    ${CurrencyFragmentDoc}`;
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
  email
  phone
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
  productId
  name
  description
  imageUrl
  productCategory
  productSku
  isComplete
  createdAt
  updatedAt
}
    `;
export const CartFragmentDoc = gql`
    fragment Cart on Cart {
  defaultCurrency {
    ...Currency
  }
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
}
    ${CurrencyFragmentDoc}
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
  guest
  isAdmin
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
  hidden
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
  completeStep
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
  paymentStatus
  userId
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
export const SignedUrlFragmentDoc = gql`
    fragment SignedUrl on SignedUrl {
  url
  signedUrl
}
    `;
export const TestResultFragmentDoc = gql`
    fragment TestResult on TestResult {
  message
  code
  failed {
    test
    message
  }
  passed {
    test
    message
  }
}
    `;
export const CountryFragmentDoc = gql`
    fragment Country on Country {
  id
  country
  type
  countryCode
}
    `;
export const PDocumentFragmentDoc = gql`
    fragment PDocument on PDocument {
  id
  country
  type
  countryCode
  background
  dpi
  dimensions {
    height
    unit
    width
  }
  size {
    max
    min
  }
  head {
    Dimensions {
      height
      unit
      width
    }
    position {
      max
      min
      unit
    }
  }
}
    `;
export const CreateGuestDocument = gql`
    mutation CreateGuest {
  CreateGuest {
    data {
      accessToken
    }
    message
    status
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
export const SetDefaultCurrencyDocument = gql`
    mutation SetDefaultCurrency($currency: CurrencyInput!) {
  SetDefaultCurrency(currency: $currency) {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export type SetDefaultCurrencyMutationFn = Apollo.MutationFunction<SetDefaultCurrencyMutation, SetDefaultCurrencyMutationVariables>;

/**
 * __useSetDefaultCurrencyMutation__
 *
 * To run a mutation, you first call `useSetDefaultCurrencyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDefaultCurrencyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDefaultCurrencyMutation, { data, loading, error }] = useSetDefaultCurrencyMutation({
 *   variables: {
 *      currency: // value for 'currency'
 *   },
 * });
 */
export function useSetDefaultCurrencyMutation(baseOptions?: Apollo.MutationHookOptions<SetDefaultCurrencyMutation, SetDefaultCurrencyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SetDefaultCurrencyMutation, SetDefaultCurrencyMutationVariables>(SetDefaultCurrencyDocument, options);
      }
export type SetDefaultCurrencyMutationHookResult = ReturnType<typeof useSetDefaultCurrencyMutation>;
export type SetDefaultCurrencyMutationResult = Apollo.MutationResult<SetDefaultCurrencyMutation>;
export type SetDefaultCurrencyMutationOptions = Apollo.BaseMutationOptions<SetDefaultCurrencyMutation, SetDefaultCurrencyMutationVariables>;
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
    mutation SetShippingTypeToCart($shippingType: String!) {
  SetShippingTypeToCart(shippingType: $shippingType) {
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
    mutation GetPaymentIntent($orderId: String!, $currency: String!) {
  GetPaymentIntent(orderId: $orderId, currency: $currency) {
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
 *      currency: // value for 'currency'
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
export const CheckPhotoDocument = gql`
    mutation CheckPhoto($userAgent: String!, $imageResolution: String!, $entryId: String!) {
  CheckPhoto(
    userAgent: $userAgent
    imageResolution: $imageResolution
    entryId: $entryId
  ) {
    message
    status
    data {
      ...TestResult
    }
  }
}
    ${TestResultFragmentDoc}`;
export type CheckPhotoMutationFn = Apollo.MutationFunction<CheckPhotoMutation, CheckPhotoMutationVariables>;

/**
 * __useCheckPhotoMutation__
 *
 * To run a mutation, you first call `useCheckPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCheckPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [checkPhotoMutation, { data, loading, error }] = useCheckPhotoMutation({
 *   variables: {
 *      userAgent: // value for 'userAgent'
 *      imageResolution: // value for 'imageResolution'
 *      entryId: // value for 'entryId'
 *   },
 * });
 */
export function useCheckPhotoMutation(baseOptions?: Apollo.MutationHookOptions<CheckPhotoMutation, CheckPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CheckPhotoMutation, CheckPhotoMutationVariables>(CheckPhotoDocument, options);
      }
export type CheckPhotoMutationHookResult = ReturnType<typeof useCheckPhotoMutation>;
export type CheckPhotoMutationResult = Apollo.MutationResult<CheckPhotoMutation>;
export type CheckPhotoMutationOptions = Apollo.BaseMutationOptions<CheckPhotoMutation, CheckPhotoMutationVariables>;
export const SendEmailToAdminDocument = gql`
    mutation SendEmailToAdmin($data: EmailToAdminInput!) {
  SendEmailToAdmin(data: $data) {
    status
    message
    data
  }
}
    `;
export type SendEmailToAdminMutationFn = Apollo.MutationFunction<SendEmailToAdminMutation, SendEmailToAdminMutationVariables>;

/**
 * __useSendEmailToAdminMutation__
 *
 * To run a mutation, you first call `useSendEmailToAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendEmailToAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendEmailToAdminMutation, { data, loading, error }] = useSendEmailToAdminMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useSendEmailToAdminMutation(baseOptions?: Apollo.MutationHookOptions<SendEmailToAdminMutation, SendEmailToAdminMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendEmailToAdminMutation, SendEmailToAdminMutationVariables>(SendEmailToAdminDocument, options);
      }
export type SendEmailToAdminMutationHookResult = ReturnType<typeof useSendEmailToAdminMutation>;
export type SendEmailToAdminMutationResult = Apollo.MutationResult<SendEmailToAdminMutation>;
export type SendEmailToAdminMutationOptions = Apollo.BaseMutationOptions<SendEmailToAdminMutation, SendEmailToAdminMutationVariables>;
export const UpdateCartItemPriceDocument = gql`
    mutation UpdateCartItemPrice($item: UpdateCartItemPriceInput!) {
  UpdateCartItemPrice(item: $item) {
    message
    status
    data {
      ...Cart
    }
  }
}
    ${CartFragmentDoc}`;
export type UpdateCartItemPriceMutationFn = Apollo.MutationFunction<UpdateCartItemPriceMutation, UpdateCartItemPriceMutationVariables>;

/**
 * __useUpdateCartItemPriceMutation__
 *
 * To run a mutation, you first call `useUpdateCartItemPriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartItemPriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartItemPriceMutation, { data, loading, error }] = useUpdateCartItemPriceMutation({
 *   variables: {
 *      item: // value for 'item'
 *   },
 * });
 */
export function useUpdateCartItemPriceMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCartItemPriceMutation, UpdateCartItemPriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCartItemPriceMutation, UpdateCartItemPriceMutationVariables>(UpdateCartItemPriceDocument, options);
      }
export type UpdateCartItemPriceMutationHookResult = ReturnType<typeof useUpdateCartItemPriceMutation>;
export type UpdateCartItemPriceMutationResult = Apollo.MutationResult<UpdateCartItemPriceMutation>;
export type UpdateCartItemPriceMutationOptions = Apollo.BaseMutationOptions<UpdateCartItemPriceMutation, UpdateCartItemPriceMutationVariables>;
export const SendOtpDocument = gql`
    mutation SendOTP($accessToken: String!, $email: String!) {
  SendOTP(accessToken: $accessToken, email: $email) {
    message
    status
  }
}
    `;
export type SendOtpMutationFn = Apollo.MutationFunction<SendOtpMutation, SendOtpMutationVariables>;

/**
 * __useSendOtpMutation__
 *
 * To run a mutation, you first call `useSendOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendOtpMutation, { data, loading, error }] = useSendOtpMutation({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendOtpMutation(baseOptions?: Apollo.MutationHookOptions<SendOtpMutation, SendOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendOtpMutation, SendOtpMutationVariables>(SendOtpDocument, options);
      }
export type SendOtpMutationHookResult = ReturnType<typeof useSendOtpMutation>;
export type SendOtpMutationResult = Apollo.MutationResult<SendOtpMutation>;
export type SendOtpMutationOptions = Apollo.BaseMutationOptions<SendOtpMutation, SendOtpMutationVariables>;
export const VerifyOtpDocument = gql`
    mutation VerifyOTP($accessToken: String!, $otp: String!) {
  VerifyOTP(accessToken: $accessToken, otp: $otp) {
    data {
      authToken
      user {
        ...User
      }
      editToken
      imageUrl
    }
    status
    message
  }
}
    ${UserFragmentDoc}`;
export type VerifyOtpMutationFn = Apollo.MutationFunction<VerifyOtpMutation, VerifyOtpMutationVariables>;

/**
 * __useVerifyOtpMutation__
 *
 * To run a mutation, you first call `useVerifyOtpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyOtpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyOtpMutation, { data, loading, error }] = useVerifyOtpMutation({
 *   variables: {
 *      accessToken: // value for 'accessToken'
 *      otp: // value for 'otp'
 *   },
 * });
 */
export function useVerifyOtpMutation(baseOptions?: Apollo.MutationHookOptions<VerifyOtpMutation, VerifyOtpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyOtpMutation, VerifyOtpMutationVariables>(VerifyOtpDocument, options);
      }
export type VerifyOtpMutationHookResult = ReturnType<typeof useVerifyOtpMutation>;
export type VerifyOtpMutationResult = Apollo.MutationResult<VerifyOtpMutation>;
export type VerifyOtpMutationOptions = Apollo.BaseMutationOptions<VerifyOtpMutation, VerifyOtpMutationVariables>;
export const UpdateEntryPhotoDocument = gql`
    mutation UpdateEntryPhoto($imageUrl: String!, $editToken: String!) {
  UpdateEntryPhoto(imageUrl: $imageUrl, editToken: $editToken) {
    message
    status
    data {
      id
    }
  }
}
    `;
export type UpdateEntryPhotoMutationFn = Apollo.MutationFunction<UpdateEntryPhotoMutation, UpdateEntryPhotoMutationVariables>;

/**
 * __useUpdateEntryPhotoMutation__
 *
 * To run a mutation, you first call `useUpdateEntryPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateEntryPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateEntryPhotoMutation, { data, loading, error }] = useUpdateEntryPhotoMutation({
 *   variables: {
 *      imageUrl: // value for 'imageUrl'
 *      editToken: // value for 'editToken'
 *   },
 * });
 */
export function useUpdateEntryPhotoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateEntryPhotoMutation, UpdateEntryPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateEntryPhotoMutation, UpdateEntryPhotoMutationVariables>(UpdateEntryPhotoDocument, options);
      }
export type UpdateEntryPhotoMutationHookResult = ReturnType<typeof useUpdateEntryPhotoMutation>;
export type UpdateEntryPhotoMutationResult = Apollo.MutationResult<UpdateEntryPhotoMutation>;
export type UpdateEntryPhotoMutationOptions = Apollo.BaseMutationOptions<UpdateEntryPhotoMutation, UpdateEntryPhotoMutationVariables>;
export const UpdateOrderPhotoDocument = gql`
    mutation UpdateOrderPhoto($imageUrl: String!, $editToken: String!) {
  UpdateOrderPhoto(imageUrl: $imageUrl, editToken: $editToken) {
    message
    status
  }
}
    `;
export type UpdateOrderPhotoMutationFn = Apollo.MutationFunction<UpdateOrderPhotoMutation, UpdateOrderPhotoMutationVariables>;

/**
 * __useUpdateOrderPhotoMutation__
 *
 * To run a mutation, you first call `useUpdateOrderPhotoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrderPhotoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrderPhotoMutation, { data, loading, error }] = useUpdateOrderPhotoMutation({
 *   variables: {
 *      imageUrl: // value for 'imageUrl'
 *      editToken: // value for 'editToken'
 *   },
 * });
 */
export function useUpdateOrderPhotoMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrderPhotoMutation, UpdateOrderPhotoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateOrderPhotoMutation, UpdateOrderPhotoMutationVariables>(UpdateOrderPhotoDocument, options);
      }
export type UpdateOrderPhotoMutationHookResult = ReturnType<typeof useUpdateOrderPhotoMutation>;
export type UpdateOrderPhotoMutationResult = Apollo.MutationResult<UpdateOrderPhotoMutation>;
export type UpdateOrderPhotoMutationOptions = Apollo.BaseMutationOptions<UpdateOrderPhotoMutation, UpdateOrderPhotoMutationVariables>;
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
export const OrderSkusDocument = gql`
    query OrderSkus($orderNumber: Float!) {
  OrderByOrderNumber(orderNumber: $orderNumber) {
    message
    status
    data {
      skus
    }
  }
}
    `;

/**
 * __useOrderSkusQuery__
 *
 * To run a query within a React component, call `useOrderSkusQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderSkusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderSkusQuery({
 *   variables: {
 *      orderNumber: // value for 'orderNumber'
 *   },
 * });
 */
export function useOrderSkusQuery(baseOptions: Apollo.QueryHookOptions<OrderSkusQuery, OrderSkusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OrderSkusQuery, OrderSkusQueryVariables>(OrderSkusDocument, options);
      }
export function useOrderSkusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrderSkusQuery, OrderSkusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OrderSkusQuery, OrderSkusQueryVariables>(OrderSkusDocument, options);
        }
export type OrderSkusQueryHookResult = ReturnType<typeof useOrderSkusQuery>;
export type OrderSkusLazyQueryHookResult = ReturnType<typeof useOrderSkusLazyQuery>;
export type OrderSkusQueryResult = Apollo.QueryResult<OrderSkusQuery, OrderSkusQueryVariables>;
export const GetSignedUrlDocument = gql`
    query GetSignedUrl {
  GetSignedUrl {
    message
    status
    data {
      ...SignedUrl
    }
  }
}
    ${SignedUrlFragmentDoc}`;

/**
 * __useGetSignedUrlQuery__
 *
 * To run a query within a React component, call `useGetSignedUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSignedUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSignedUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSignedUrlQuery(baseOptions?: Apollo.QueryHookOptions<GetSignedUrlQuery, GetSignedUrlQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSignedUrlQuery, GetSignedUrlQueryVariables>(GetSignedUrlDocument, options);
      }
export function useGetSignedUrlLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSignedUrlQuery, GetSignedUrlQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSignedUrlQuery, GetSignedUrlQueryVariables>(GetSignedUrlDocument, options);
        }
export type GetSignedUrlQueryHookResult = ReturnType<typeof useGetSignedUrlQuery>;
export type GetSignedUrlLazyQueryHookResult = ReturnType<typeof useGetSignedUrlLazyQuery>;
export type GetSignedUrlQueryResult = Apollo.QueryResult<GetSignedUrlQuery, GetSignedUrlQueryVariables>;
export const CountriesDocument = gql`
    query Countries {
  Countries {
    data {
      ...Country
    }
    total
  }
}
    ${CountryFragmentDoc}`;

/**
 * __useCountriesQuery__
 *
 * To run a query within a React component, call `useCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountriesQuery(baseOptions?: Apollo.QueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
      }
export function useCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
        }
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<typeof useCountriesLazyQuery>;
export type CountriesQueryResult = Apollo.QueryResult<CountriesQuery, CountriesQueryVariables>;
export const DocumentsByCountryDocument = gql`
    query DocumentsByCountry($country: String!) {
  DocumentsByCountry(country: $country) {
    data {
      ...PDocument
    }
    total
  }
}
    ${PDocumentFragmentDoc}`;

/**
 * __useDocumentsByCountryQuery__
 *
 * To run a query within a React component, call `useDocumentsByCountryQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentsByCountryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentsByCountryQuery({
 *   variables: {
 *      country: // value for 'country'
 *   },
 * });
 */
export function useDocumentsByCountryQuery(baseOptions: Apollo.QueryHookOptions<DocumentsByCountryQuery, DocumentsByCountryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DocumentsByCountryQuery, DocumentsByCountryQueryVariables>(DocumentsByCountryDocument, options);
      }
export function useDocumentsByCountryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DocumentsByCountryQuery, DocumentsByCountryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DocumentsByCountryQuery, DocumentsByCountryQueryVariables>(DocumentsByCountryDocument, options);
        }
export type DocumentsByCountryQueryHookResult = ReturnType<typeof useDocumentsByCountryQuery>;
export type DocumentsByCountryLazyQueryHookResult = ReturnType<typeof useDocumentsByCountryLazyQuery>;
export type DocumentsByCountryQueryResult = Apollo.QueryResult<DocumentsByCountryQuery, DocumentsByCountryQueryVariables>;
export const DocumentDocument = gql`
    query Document($id: String!) {
  Document(id: $id) {
    message
    status
    data {
      ...PDocument
    }
  }
}
    ${PDocumentFragmentDoc}`;

/**
 * __useDocumentQuery__
 *
 * To run a query within a React component, call `useDocumentQuery` and pass it any options that fit your needs.
 * When your component renders, `useDocumentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDocumentQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDocumentQuery(baseOptions: Apollo.QueryHookOptions<DocumentQuery, DocumentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<DocumentQuery, DocumentQueryVariables>(DocumentDocument, options);
      }
export function useDocumentLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DocumentQuery, DocumentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<DocumentQuery, DocumentQueryVariables>(DocumentDocument, options);
        }
export type DocumentQueryHookResult = ReturnType<typeof useDocumentQuery>;
export type DocumentLazyQueryHookResult = ReturnType<typeof useDocumentLazyQuery>;
export type DocumentQueryResult = Apollo.QueryResult<DocumentQuery, DocumentQueryVariables>;
export const ProductsDocument = gql`
    query Products($currencyCode: CurrencyCode) {
  Products(currencyCode: $currencyCode) {
    data {
      ...Product
    }
    message
    status
  }
}
    ${ProductFragmentDoc}`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      currencyCode: // value for 'currencyCode'
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const CurrenciesDocument = gql`
    query Currencies {
  Currencies {
    data {
      ...Currency
    }
    message
    status
  }
}
    ${CurrencyFragmentDoc}`;

/**
 * __useCurrenciesQuery__
 *
 * To run a query within a React component, call `useCurrenciesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrenciesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrenciesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrenciesQuery(baseOptions?: Apollo.QueryHookOptions<CurrenciesQuery, CurrenciesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrenciesQuery, CurrenciesQueryVariables>(CurrenciesDocument, options);
      }
export function useCurrenciesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrenciesQuery, CurrenciesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrenciesQuery, CurrenciesQueryVariables>(CurrenciesDocument, options);
        }
export type CurrenciesQueryHookResult = ReturnType<typeof useCurrenciesQuery>;
export type CurrenciesLazyQueryHookResult = ReturnType<typeof useCurrenciesLazyQuery>;
export type CurrenciesQueryResult = Apollo.QueryResult<CurrenciesQuery, CurrenciesQueryVariables>;