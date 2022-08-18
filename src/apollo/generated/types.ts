export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Value: any;
};

export type BillingAddress = {
  __typename?: 'BillingAddress';
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
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  postalCode: Scalars['String'];
  state?: InputMaybe<Scalars['String']>;
};

export type BillingAddressResponse = {
  __typename?: 'BillingAddressResponse';
  data?: Maybe<BillingAddress>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Cart = {
  __typename?: 'Cart';
  billingAddress?: Maybe<BillingAddress>;
  defaultCurrency?: Maybe<Currency>;
  items?: Maybe<Array<CartItem>>;
  promoCode?: Maybe<Scalars['String']>;
  remarks?: Maybe<Scalars['String']>;
  shippingAddress?: Maybe<ShippingAddress>;
  shippingType: ShippingType;
};

export type CartItem = {
  __typename?: 'CartItem';
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  isComplete: Scalars['Boolean'];
  name: Scalars['String'];
  /** Deprecated. */
  price?: Maybe<Scalars['Float']>;
  /** Deprecated. */
  product?: Maybe<Scalars['String']>;
  productCategory?: Maybe<ProductCategory>;
  productId: Scalars['ID'];
  productSku?: Maybe<ProductSku>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type CartItemInput = {
  description: Scalars['String'];
  imageUrl?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  productCategory?: InputMaybe<ProductCategory>;
  productId: Scalars['ID'];
  productSku: ProductSku;
};

export type CartResponse = {
  __typename?: 'CartResponse';
  data?: Maybe<Cart>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type CheckPhotoResponse = {
  __typename?: 'CheckPhotoResponse';
  data?: Maybe<TestResult>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Checklist = {
  __typename?: 'Checklist';
  confirmed?: Maybe<Scalars['Boolean']>;
  id: Scalars['String'];
  items: Array<ChecklistItem>;
  photoUrl: Scalars['String'];
  refusalReason?: Maybe<Scalars['String']>;
  sellerName?: Maybe<Scalars['String']>;
};

export type ChecklistInput = {
  confirmed: Scalars['Boolean'];
  id: Scalars['String'];
  items: Array<ChecklistItemInput>;
  refusalReason?: InputMaybe<Scalars['String']>;
  sellerName: Scalars['String'];
};

export type ChecklistItem = {
  __typename?: 'ChecklistItem';
  result?: Maybe<Scalars['Boolean']>;
  spec: Scalars['String'];
};

export type ChecklistItemInput = {
  result: Scalars['Boolean'];
  spec: Scalars['String'];
};

export type ChecklistResponse = {
  __typename?: 'ChecklistResponse';
  data: Array<Checklist>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export enum Code {
  Code200 = 'Code200',
  Code400 = 'Code400',
  Code500 = 'Code500'
}

export type CountriesResponse = {
  __typename?: 'CountriesResponse';
  data: Array<Country>;
  total: Scalars['Float'];
};

export type Country = {
  __typename?: 'Country';
  country?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  type?: Maybe<Scalars['String']>;
};

export type CurrenciesResponse = {
  __typename?: 'CurrenciesResponse';
  data: Array<Currency>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Currency = {
  __typename?: 'Currency';
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
  __typename?: 'Dictionary';
  message?: Maybe<Scalars['String']>;
  test?: Maybe<Scalars['String']>;
};

export type Dimensions = {
  __typename?: 'Dimensions';
  height?: Maybe<Scalars['Float']>;
  unit?: Maybe<Scalars['String']>;
  width?: Maybe<Scalars['Float']>;
};

export type EmailToAdminInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  question: Scalars['String'];
};

export type Entry = {
  __typename?: 'Entry';
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
  __typename?: 'EntryPaginatedResponse';
  data: Array<Entry>;
  total: Scalars['Float'];
};

export type EntryResponse = {
  __typename?: 'EntryResponse';
  data?: Maybe<Entry>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Eye = {
  __typename?: 'Eye';
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
  __typename?: 'Form';
  description: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
  steps: Array<FormStep>;
};

export type FormField = {
  __typename?: 'FormField';
  defaultValue?: Maybe<Scalars['Value']>;
  disabled?: Maybe<Scalars['Boolean']>;
  hidden?: Maybe<Scalars['Boolean']>;
  index?: Maybe<Scalars['Float']>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  options?: Maybe<Array<Option>>;
  placeholder?: Maybe<Scalars['String']>;
  required?: Maybe<Scalars['Boolean']>;
  /** half-size | full-size */
  size?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  type: FieldType;
  validations?: Maybe<Array<Validation>>;
  value?: Maybe<Scalars['Value']>;
};

export type FormFieldInput = {
  defaultValue?: InputMaybe<Scalars['Value']>;
  disabled?: InputMaybe<Scalars['Boolean']>;
  hidden?: InputMaybe<Scalars['Boolean']>;
  index?: InputMaybe<Scalars['Float']>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  options?: InputMaybe<Array<OptionInput>>;
  placeholder?: InputMaybe<Scalars['String']>;
  required?: InputMaybe<Scalars['Boolean']>;
  text?: InputMaybe<Scalars['String']>;
  type: FieldType;
  validations?: InputMaybe<Array<ValidationInput>>;
  value?: InputMaybe<Scalars['Value']>;
};

export type FormResponse = {
  __typename?: 'FormResponse';
  data?: Maybe<Form>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type FormStep = {
  __typename?: 'FormStep';
  fields: Array<FormField>;
  name: Scalars['String'];
  notes?: Maybe<Scalars['String']>;
  step: Scalars['Int'];
};

export type FormStepInput = {
  fields: Array<FormFieldInput>;
  name: Scalars['String'];
  notes?: InputMaybe<Scalars['String']>;
  step: Scalars['Int'];
};

export enum FulfillmentCenter {
  Europe = 'Europe',
  Us = 'US'
}

export type Head = {
  __typename?: 'Head';
  Dimensions?: Maybe<Dimensions>;
  position?: Maybe<Position>;
};

export type Mutation = {
  __typename?: 'Mutation';
  AddBillingAddressToCart: CartResponse;
  AddItemsToCart: CartResponse;
  AddOneClickInfo: CartResponse;
  AddPromoCodeToCart: CartResponse;
  AddShippingAddressToCart: CartResponse;
  CheckPhoto: CheckPhotoResponse;
  ClearCart: CartResponse;
  ConfirmChecklist: ChecklistResponse;
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


export type MutationAddOneClickInfoArgs = {
  input: OneClickInfoInput;
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


export type MutationConfirmChecklistArgs = {
  input: ChecklistInput;
  orderNumber: Scalars['Float'];
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
  entryId?: InputMaybe<Scalars['ID']>;
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

export type OneClickInfoInput = {
  address1: Scalars['String'];
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  postalCode: Scalars['String'];
  remarks: Scalars['String'];
  shippingType: ShippingType;
  state?: InputMaybe<Scalars['String']>;
};

export type Option = {
  __typename?: 'Option';
  notes?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  value: Scalars['Value'];
};

export type OptionInput = {
  notes?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  value: Scalars['Value'];
};

export type Order = {
  __typename?: 'Order';
  billingAddress: BillingAddress;
  createdAt: Scalars['DateTime'];
  currency?: Maybe<Currency>;
  fulfillmentFires: Scalars['Float'];
  id: Scalars['ID'];
  items: Array<OrderItem>;
  orderNumber: Scalars['Int'];
  paymentStatus: PaymentStatus;
  promoCode?: Maybe<Scalars['String']>;
  remarks?: Maybe<Scalars['String']>;
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
  __typename?: 'OrderEditRes';
  authToken?: Maybe<Scalars['String']>;
  editToken?: Maybe<Scalars['String']>;
  imageUrl?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type OrderEditResponse = {
  __typename?: 'OrderEditResponse';
  data?: Maybe<OrderEditRes>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type OrderItem = {
  __typename?: 'OrderItem';
  checklist?: Maybe<Checklist>;
  createdAt?: Maybe<Scalars['DateTime']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  isComplete: Scalars['Boolean'];
  name: Scalars['String'];
  /** Deprecated. */
  price?: Maybe<Scalars['Float']>;
  /** Deprecated. */
  product?: Maybe<Scalars['String']>;
  productCategory?: Maybe<ProductCategory>;
  productId: Scalars['ID'];
  productSku?: Maybe<ProductSku>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type OrderPaginatedResponse = {
  __typename?: 'OrderPaginatedResponse';
  data: Array<Order>;
  total: Scalars['Float'];
};

export type OrderResponse = {
  __typename?: 'OrderResponse';
  data?: Maybe<Order>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type OrderShipStation = {
  __typename?: 'OrderShipStation';
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
  __typename?: 'OrderTrack';
  confirmOrder: TrackStep;
  delivered: TrackStep;
  outForDelivery: TrackStep;
  productPrepared: TrackStep;
  shipped: TrackStep;
};

export type PDocument = {
  __typename?: 'PDocument';
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
  __typename?: 'PDocumentResponse';
  data?: Maybe<PDocument>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type PDocumentsResponse = {
  __typename?: 'PDocumentsResponse';
  data: Array<PDocument>;
  total: Scalars['Float'];
};

export type PaymentIntent = {
  __typename?: 'PaymentIntent';
  clientSecret: Scalars['String'];
};

export type PaymentIntentResponse = {
  __typename?: 'PaymentIntentResponse';
  data?: Maybe<PaymentIntent>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export enum PaymentStatus {
  Completed = 'COMPLETED',
  Pending = 'PENDING'
}

export type Position = {
  __typename?: 'Position';
  max?: Maybe<Scalars['Float']>;
  min?: Maybe<Scalars['Float']>;
  unit?: Maybe<Unit>;
};

export type Product = {
  __typename?: 'Product';
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
  __typename?: 'ProductsResponse';
  data: Array<Product>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  AllProducts: StringResponse;
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
  GetChecklist: ChecklistResponse;
  GetCountry: StringResponse;
  GetSignedUrl: SignedUrlResponse;
  Me: UserResponse;
  Order: OrderResponse;
  OrderByOrderNumber: OrderResponse;
  Orders: OrderPaginatedResponse;
  OrdersForAdmin: OrderPaginatedResponse;
  Products: ProductsResponse;
};


export type QueryCompletedOrdersArgs = {
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryDocumentArgs = {
  id: Scalars['String'];
};


export type QueryDocumentsByCountryArgs = {
  country: Scalars['String'];
};


export type QueryEntriesArgs = {
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryEntryArgs = {
  entryId: Scalars['String'];
};


export type QueryFormArgs = {
  id: Scalars['String'];
};


export type QueryGetChecklistArgs = {
  orderNumber: Scalars['Float'];
};


export type QueryOrderArgs = {
  orderId: Scalars['String'];
};


export type QueryOrderByOrderNumberArgs = {
  orderNumber: Scalars['Float'];
};


export type QueryOrdersArgs = {
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryOrdersForAdminArgs = {
  locale?: InputMaybe<Array<Scalars['String']>>;
  page?: InputMaybe<Scalars['Int']>;
  pageSize?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryProductsArgs = {
  currencyCode?: InputMaybe<CurrencyCode>;
};

export type ShipStationStatus = {
  __typename?: 'ShipStationStatus';
  date: Scalars['String'];
  status: Scalars['String'];
};

export type ShippingAddress = {
  __typename?: 'ShippingAddress';
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
  address2?: InputMaybe<Scalars['String']>;
  city: Scalars['String'];
  country: Scalars['String'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone: Scalars['String'];
  postalCode: Scalars['String'];
  state?: InputMaybe<Scalars['String']>;
};

export type ShippingAddressResponse = {
  __typename?: 'ShippingAddressResponse';
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
  __typename?: 'SignedUrl';
  signedUrl: Scalars['String'];
  url: Scalars['String'];
};

export type SignedUrlResponse = {
  __typename?: 'SignedUrlResponse';
  data?: Maybe<SignedUrl>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type Size = {
  __typename?: 'Size';
  max?: Maybe<Scalars['Int']>;
  min?: Maybe<Scalars['Int']>;
};

export type StringResponse = {
  __typename?: 'StringResponse';
  data?: Maybe<Scalars['String']>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type TestResult = {
  __typename?: 'TestResult';
  code?: Maybe<Code>;
  failed?: Maybe<Array<Dictionary>>;
  message?: Maybe<Scalars['String']>;
  passed?: Maybe<Array<Dictionary>>;
};

export type Token = {
  __typename?: 'Token';
  accessToken: Scalars['String'];
};

export type TokenResponse = {
  __typename?: 'TokenResponse';
  data?: Maybe<Token>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type TrackStep = {
  __typename?: 'TrackStep';
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
  __typename?: 'User';
  billingAddress?: Maybe<BillingAddress>;
  cart?: Maybe<Cart>;
  country?: Maybe<Scalars['String']>;
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
  __typename?: 'UserResponse';
  data?: Maybe<User>;
  message: Scalars['String'];
  status: Scalars['Boolean'];
};

export type ValidatedImage = {
  __typename?: 'ValidatedImage';
  image?: Maybe<Scalars['String']>;
};

export type Validation = {
  __typename?: 'Validation';
  message?: Maybe<Scalars['String']>;
  type: ValidationType;
  value?: Maybe<Scalars['Float']>;
};

export type ValidationInput = {
  message?: InputMaybe<Scalars['String']>;
  type: ValidationType;
  value?: InputMaybe<Scalars['Float']>;
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
