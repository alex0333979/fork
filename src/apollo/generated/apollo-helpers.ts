import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type BillingAddressKeySpecifier = ('address1' | 'address2' | 'city' | 'country' | 'email' | 'firstName' | 'lastName' | 'phone' | 'postalCode' | 'state' | BillingAddressKeySpecifier)[];
export type BillingAddressFieldPolicy = {
	address1?: FieldPolicy<any> | FieldReadFunction<any>,
	address2?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCode?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>
};
export type BillingAddressResponseKeySpecifier = ('data' | 'message' | 'status' | BillingAddressResponseKeySpecifier)[];
export type BillingAddressResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartKeySpecifier = ('billingAddress' | 'defaultCurrency' | 'expeditingService' | 'items' | 'promoCode' | 'remarks' | 'shippingAddress' | 'shippingType' | CartKeySpecifier)[];
export type CartFieldPolicy = {
	billingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	defaultCurrency?: FieldPolicy<any> | FieldReadFunction<any>,
	expeditingService?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	promoCode?: FieldPolicy<any> | FieldReadFunction<any>,
	remarks?: FieldPolicy<any> | FieldReadFunction<any>,
	shippingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	shippingType?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartItemKeySpecifier = ('createdAt' | 'description' | 'id' | 'imageUrl' | 'isComplete' | 'name' | 'price' | 'product' | 'productCategory' | 'productId' | 'productSku' | 'updatedAt' | CartItemKeySpecifier)[];
export type CartItemFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	imageUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	isComplete?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	productCategory?: FieldPolicy<any> | FieldReadFunction<any>,
	productId?: FieldPolicy<any> | FieldReadFunction<any>,
	productSku?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CartResponseKeySpecifier = ('data' | 'message' | 'status' | CartResponseKeySpecifier)[];
export type CartResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CheckPhotoResponseKeySpecifier = ('data' | 'message' | 'status' | CheckPhotoResponseKeySpecifier)[];
export type CheckPhotoResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChecklistKeySpecifier = ('confirmed' | 'id' | 'items' | 'photoUrl' | 'refusalReason' | 'sellerName' | ChecklistKeySpecifier)[];
export type ChecklistFieldPolicy = {
	confirmed?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	photoUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	refusalReason?: FieldPolicy<any> | FieldReadFunction<any>,
	sellerName?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChecklistItemKeySpecifier = ('result' | 'spec' | ChecklistItemKeySpecifier)[];
export type ChecklistItemFieldPolicy = {
	result?: FieldPolicy<any> | FieldReadFunction<any>,
	spec?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ChecklistResponseKeySpecifier = ('data' | 'message' | 'status' | ChecklistResponseKeySpecifier)[];
export type ChecklistResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CountriesResponseKeySpecifier = ('data' | 'total' | CountriesResponseKeySpecifier)[];
export type CountriesResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CountryKeySpecifier = ('country' | 'countryCode' | 'id' | 'type' | CountryKeySpecifier)[];
export type CountryFieldPolicy = {
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	countryCode?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrenciesResponseKeySpecifier = ('data' | 'message' | 'status' | CurrenciesResponseKeySpecifier)[];
export type CurrenciesResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CurrencyKeySpecifier = ('code' | 'label' | 'symbol' | CurrencyKeySpecifier)[];
export type CurrencyFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	label?: FieldPolicy<any> | FieldReadFunction<any>,
	symbol?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DictionaryKeySpecifier = ('message' | 'test' | DictionaryKeySpecifier)[];
export type DictionaryFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	test?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DimensionsKeySpecifier = ('height' | 'unit' | 'width' | DimensionsKeySpecifier)[];
export type DimensionsFieldPolicy = {
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	unit?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EntryKeySpecifier = ('completeStep' | 'createdAt' | 'currentStep' | 'form' | 'formId' | 'id' | 'isComplete' | 'updatedAt' | 'userId' | EntryKeySpecifier)[];
export type EntryFieldPolicy = {
	completeStep?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	currentStep?: FieldPolicy<any> | FieldReadFunction<any>,
	form?: FieldPolicy<any> | FieldReadFunction<any>,
	formId?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isComplete?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EntryPaginatedResponseKeySpecifier = ('data' | 'total' | EntryPaginatedResponseKeySpecifier)[];
export type EntryPaginatedResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EntryResponseKeySpecifier = ('data' | 'message' | 'status' | EntryResponseKeySpecifier)[];
export type EntryResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EyeKeySpecifier = ('position' | EyeKeySpecifier)[];
export type EyeFieldPolicy = {
	position?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FormKeySpecifier = ('description' | 'id' | 'name' | 'steps' | FormKeySpecifier)[];
export type FormFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	steps?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FormFieldKeySpecifier = ('defaultValue' | 'disabled' | 'hidden' | 'index' | 'name' | 'notes' | 'options' | 'placeholder' | 'required' | 'size' | 'text' | 'type' | 'validations' | 'value' | FormFieldKeySpecifier)[];
export type FormFieldFieldPolicy = {
	defaultValue?: FieldPolicy<any> | FieldReadFunction<any>,
	disabled?: FieldPolicy<any> | FieldReadFunction<any>,
	hidden?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	options?: FieldPolicy<any> | FieldReadFunction<any>,
	placeholder?: FieldPolicy<any> | FieldReadFunction<any>,
	required?: FieldPolicy<any> | FieldReadFunction<any>,
	size?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	validations?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FormResponseKeySpecifier = ('data' | 'message' | 'status' | FormResponseKeySpecifier)[];
export type FormResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FormStepKeySpecifier = ('fields' | 'name' | 'notes' | 'step' | FormStepKeySpecifier)[];
export type FormStepFieldPolicy = {
	fields?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	step?: FieldPolicy<any> | FieldReadFunction<any>
};
export type HeadKeySpecifier = ('Dimensions' | 'position' | HeadKeySpecifier)[];
export type HeadFieldPolicy = {
	Dimensions?: FieldPolicy<any> | FieldReadFunction<any>,
	position?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('AddAddressToCart' | 'AddBillingAddressToCart' | 'AddItemsToCart' | 'AddOneClickInfo' | 'AddPromoCodeToCart' | 'AddShippingAddressToCart' | 'CheckPhoto' | 'ClearCart' | 'ConfirmChecklist' | 'CreateGuest' | 'CreateOrder' | 'DeleteOrder' | 'GetPaymentIntent' | 'Login' | 'RemoveItemsFromCart' | 'SendEmailToAdmin' | 'SendOTP' | 'SendOrderConfirmToFulfillmentManually' | 'SendOrderConfirmToUserManually' | 'SendOrderEditRequest' | 'SetDefaultBillingAddress' | 'SetDefaultCurrency' | 'SetDefaultShippingAddress' | 'SetShippingTypeToCart' | 'SetTrackingNumber' | 'SignUp' | 'SubmitEntry' | 'UpdateCart' | 'UpdateCartItemPrice' | 'UpdateEntryPhoto' | 'UpdateOrderDetail' | 'UpdateOrderPhoto' | 'UpdateOrderStatus' | 'VerifyOTP' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	AddAddressToCart?: FieldPolicy<any> | FieldReadFunction<any>,
	AddBillingAddressToCart?: FieldPolicy<any> | FieldReadFunction<any>,
	AddItemsToCart?: FieldPolicy<any> | FieldReadFunction<any>,
	AddOneClickInfo?: FieldPolicy<any> | FieldReadFunction<any>,
	AddPromoCodeToCart?: FieldPolicy<any> | FieldReadFunction<any>,
	AddShippingAddressToCart?: FieldPolicy<any> | FieldReadFunction<any>,
	CheckPhoto?: FieldPolicy<any> | FieldReadFunction<any>,
	ClearCart?: FieldPolicy<any> | FieldReadFunction<any>,
	ConfirmChecklist?: FieldPolicy<any> | FieldReadFunction<any>,
	CreateGuest?: FieldPolicy<any> | FieldReadFunction<any>,
	CreateOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	DeleteOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	GetPaymentIntent?: FieldPolicy<any> | FieldReadFunction<any>,
	Login?: FieldPolicy<any> | FieldReadFunction<any>,
	RemoveItemsFromCart?: FieldPolicy<any> | FieldReadFunction<any>,
	SendEmailToAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	SendOTP?: FieldPolicy<any> | FieldReadFunction<any>,
	SendOrderConfirmToFulfillmentManually?: FieldPolicy<any> | FieldReadFunction<any>,
	SendOrderConfirmToUserManually?: FieldPolicy<any> | FieldReadFunction<any>,
	SendOrderEditRequest?: FieldPolicy<any> | FieldReadFunction<any>,
	SetDefaultBillingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	SetDefaultCurrency?: FieldPolicy<any> | FieldReadFunction<any>,
	SetDefaultShippingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	SetShippingTypeToCart?: FieldPolicy<any> | FieldReadFunction<any>,
	SetTrackingNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	SignUp?: FieldPolicy<any> | FieldReadFunction<any>,
	SubmitEntry?: FieldPolicy<any> | FieldReadFunction<any>,
	UpdateCart?: FieldPolicy<any> | FieldReadFunction<any>,
	UpdateCartItemPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	UpdateEntryPhoto?: FieldPolicy<any> | FieldReadFunction<any>,
	UpdateOrderDetail?: FieldPolicy<any> | FieldReadFunction<any>,
	UpdateOrderPhoto?: FieldPolicy<any> | FieldReadFunction<any>,
	UpdateOrderStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	VerifyOTP?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OptionKeySpecifier = ('notes' | 'text' | 'value' | OptionKeySpecifier)[];
export type OptionFieldPolicy = {
	notes?: FieldPolicy<any> | FieldReadFunction<any>,
	text?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderKeySpecifier = ('billingAddress' | 'createdAt' | 'currency' | 'expeditingService' | 'fulfillmentFires' | 'id' | 'items' | 'orderNumber' | 'paymentStatus' | 'promoCode' | 'remarks' | 'shipStation' | 'shippingAddress' | 'shippingType' | 'skus' | 'status' | 'totalPrice' | 'trackingNumber' | 'updatedAt' | 'userId' | OrderKeySpecifier)[];
export type OrderFieldPolicy = {
	billingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	expeditingService?: FieldPolicy<any> | FieldReadFunction<any>,
	fulfillmentFires?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	items?: FieldPolicy<any> | FieldReadFunction<any>,
	orderNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	paymentStatus?: FieldPolicy<any> | FieldReadFunction<any>,
	promoCode?: FieldPolicy<any> | FieldReadFunction<any>,
	remarks?: FieldPolicy<any> | FieldReadFunction<any>,
	shipStation?: FieldPolicy<any> | FieldReadFunction<any>,
	shippingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	shippingType?: FieldPolicy<any> | FieldReadFunction<any>,
	skus?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	totalPrice?: FieldPolicy<any> | FieldReadFunction<any>,
	trackingNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	userId?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderEditResKeySpecifier = ('authToken' | 'editToken' | 'imageUrl' | 'user' | OrderEditResKeySpecifier)[];
export type OrderEditResFieldPolicy = {
	authToken?: FieldPolicy<any> | FieldReadFunction<any>,
	editToken?: FieldPolicy<any> | FieldReadFunction<any>,
	imageUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderEditResponseKeySpecifier = ('data' | 'message' | 'status' | OrderEditResponseKeySpecifier)[];
export type OrderEditResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderItemKeySpecifier = ('checklist' | 'createdAt' | 'description' | 'id' | 'imageUrl' | 'isComplete' | 'name' | 'price' | 'product' | 'productCategory' | 'productId' | 'productSku' | 'updatedAt' | OrderItemKeySpecifier)[];
export type OrderItemFieldPolicy = {
	checklist?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	imageUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	isComplete?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	product?: FieldPolicy<any> | FieldReadFunction<any>,
	productCategory?: FieldPolicy<any> | FieldReadFunction<any>,
	productId?: FieldPolicy<any> | FieldReadFunction<any>,
	productSku?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderPaginatedResponseKeySpecifier = ('data' | 'total' | OrderPaginatedResponseKeySpecifier)[];
export type OrderPaginatedResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderResponseKeySpecifier = ('data' | 'message' | 'status' | OrderResponseKeySpecifier)[];
export type OrderResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderShipStationKeySpecifier = ('fulfillmentCenter' | 'orderId' | 'status' | 'trackingNumber' | OrderShipStationKeySpecifier)[];
export type OrderShipStationFieldPolicy = {
	fulfillmentCenter?: FieldPolicy<any> | FieldReadFunction<any>,
	orderId?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	trackingNumber?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OrderTrackKeySpecifier = ('confirmOrder' | 'delivered' | 'outForDelivery' | 'productPrepared' | 'shipped' | OrderTrackKeySpecifier)[];
export type OrderTrackFieldPolicy = {
	confirmOrder?: FieldPolicy<any> | FieldReadFunction<any>,
	delivered?: FieldPolicy<any> | FieldReadFunction<any>,
	outForDelivery?: FieldPolicy<any> | FieldReadFunction<any>,
	productPrepared?: FieldPolicy<any> | FieldReadFunction<any>,
	shipped?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PDocumentKeySpecifier = ('background' | 'country' | 'countryCode' | 'dimensions' | 'dpi' | 'head' | 'id' | 'size' | 'type' | PDocumentKeySpecifier)[];
export type PDocumentFieldPolicy = {
	background?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	countryCode?: FieldPolicy<any> | FieldReadFunction<any>,
	dimensions?: FieldPolicy<any> | FieldReadFunction<any>,
	dpi?: FieldPolicy<any> | FieldReadFunction<any>,
	head?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	size?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PDocumentResponseKeySpecifier = ('data' | 'message' | 'status' | PDocumentResponseKeySpecifier)[];
export type PDocumentResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PDocumentsResponseKeySpecifier = ('data' | 'total' | PDocumentsResponseKeySpecifier)[];
export type PDocumentsResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentIntentKeySpecifier = ('clientSecret' | PaymentIntentKeySpecifier)[];
export type PaymentIntentFieldPolicy = {
	clientSecret?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PaymentIntentResponseKeySpecifier = ('data' | 'message' | 'status' | PaymentIntentResponseKeySpecifier)[];
export type PaymentIntentResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PositionKeySpecifier = ('max' | 'min' | 'unit' | PositionKeySpecifier)[];
export type PositionFieldPolicy = {
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>,
	unit?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductKeySpecifier = ('category' | 'currency' | 'description' | 'price' | 'sku' | ProductKeySpecifier)[];
export type ProductFieldPolicy = {
	category?: FieldPolicy<any> | FieldReadFunction<any>,
	currency?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	price?: FieldPolicy<any> | FieldReadFunction<any>,
	sku?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ProductsResponseKeySpecifier = ('data' | 'message' | 'status' | ProductsResponseKeySpecifier)[];
export type ProductsResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('AllProducts' | 'Cart' | 'CompletedOrders' | 'Countries' | 'Currencies' | 'Document' | 'DocumentsByCountry' | 'Entries' | 'Entry' | 'ExportOrdersForAdmin' | 'Form' | 'Forms' | 'GetChecklist' | 'GetCountry' | 'GetSignedUrl' | 'Me' | 'Order' | 'OrderByOrderNumber' | 'Orders' | 'OrdersForAdmin' | 'Products' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	AllProducts?: FieldPolicy<any> | FieldReadFunction<any>,
	Cart?: FieldPolicy<any> | FieldReadFunction<any>,
	CompletedOrders?: FieldPolicy<any> | FieldReadFunction<any>,
	Countries?: FieldPolicy<any> | FieldReadFunction<any>,
	Currencies?: FieldPolicy<any> | FieldReadFunction<any>,
	Document?: FieldPolicy<any> | FieldReadFunction<any>,
	DocumentsByCountry?: FieldPolicy<any> | FieldReadFunction<any>,
	Entries?: FieldPolicy<any> | FieldReadFunction<any>,
	Entry?: FieldPolicy<any> | FieldReadFunction<any>,
	ExportOrdersForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	Form?: FieldPolicy<any> | FieldReadFunction<any>,
	Forms?: FieldPolicy<any> | FieldReadFunction<any>,
	GetChecklist?: FieldPolicy<any> | FieldReadFunction<any>,
	GetCountry?: FieldPolicy<any> | FieldReadFunction<any>,
	GetSignedUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	Me?: FieldPolicy<any> | FieldReadFunction<any>,
	Order?: FieldPolicy<any> | FieldReadFunction<any>,
	OrderByOrderNumber?: FieldPolicy<any> | FieldReadFunction<any>,
	Orders?: FieldPolicy<any> | FieldReadFunction<any>,
	OrdersForAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	Products?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ShipStationStatusKeySpecifier = ('date' | 'status' | ShipStationStatusKeySpecifier)[];
export type ShipStationStatusFieldPolicy = {
	date?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ShippingAddressKeySpecifier = ('address1' | 'address2' | 'city' | 'country' | 'email' | 'firstName' | 'lastName' | 'phone' | 'postalCode' | 'state' | ShippingAddressKeySpecifier)[];
export type ShippingAddressFieldPolicy = {
	address1?: FieldPolicy<any> | FieldReadFunction<any>,
	address2?: FieldPolicy<any> | FieldReadFunction<any>,
	city?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	postalCode?: FieldPolicy<any> | FieldReadFunction<any>,
	state?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ShippingAddressResponseKeySpecifier = ('data' | 'message' | 'status' | ShippingAddressResponseKeySpecifier)[];
export type ShippingAddressResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SignedUrlKeySpecifier = ('signedUrl' | 'url' | SignedUrlKeySpecifier)[];
export type SignedUrlFieldPolicy = {
	signedUrl?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SignedUrlResponseKeySpecifier = ('data' | 'message' | 'status' | SignedUrlResponseKeySpecifier)[];
export type SignedUrlResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SizeKeySpecifier = ('max' | 'min' | SizeKeySpecifier)[];
export type SizeFieldPolicy = {
	max?: FieldPolicy<any> | FieldReadFunction<any>,
	min?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StringResponseKeySpecifier = ('data' | 'message' | 'status' | StringResponseKeySpecifier)[];
export type StringResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TestResultKeySpecifier = ('code' | 'failed' | 'message' | 'passed' | TestResultKeySpecifier)[];
export type TestResultFieldPolicy = {
	code?: FieldPolicy<any> | FieldReadFunction<any>,
	failed?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	passed?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenKeySpecifier = ('accessToken' | TokenKeySpecifier)[];
export type TokenFieldPolicy = {
	accessToken?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TokenResponseKeySpecifier = ('data' | 'message' | 'status' | TokenResponseKeySpecifier)[];
export type TokenResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TrackStepKeySpecifier = ('status' | 'updatedAt' | TrackStepKeySpecifier)[];
export type TrackStepFieldPolicy = {
	status?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('billingAddress' | 'cart' | 'country' | 'createdAt' | 'email' | 'firstName' | 'guest' | 'id' | 'isAdmin' | 'lastName' | 'phone' | 'shippingAddress' | 'updatedAt' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	billingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	cart?: FieldPolicy<any> | FieldReadFunction<any>,
	country?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	firstName?: FieldPolicy<any> | FieldReadFunction<any>,
	guest?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isAdmin?: FieldPolicy<any> | FieldReadFunction<any>,
	lastName?: FieldPolicy<any> | FieldReadFunction<any>,
	phone?: FieldPolicy<any> | FieldReadFunction<any>,
	shippingAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserResponseKeySpecifier = ('data' | 'message' | 'status' | UserResponseKeySpecifier)[];
export type UserResponseFieldPolicy = {
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	status?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ValidatedImageKeySpecifier = ('image' | ValidatedImageKeySpecifier)[];
export type ValidatedImageFieldPolicy = {
	image?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ValidationKeySpecifier = ('message' | 'type' | 'value' | ValidationKeySpecifier)[];
export type ValidationFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	type?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	BillingAddress?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BillingAddressKeySpecifier | (() => undefined | BillingAddressKeySpecifier),
		fields?: BillingAddressFieldPolicy,
	},
	BillingAddressResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | BillingAddressResponseKeySpecifier | (() => undefined | BillingAddressResponseKeySpecifier),
		fields?: BillingAddressResponseFieldPolicy,
	},
	Cart?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartKeySpecifier | (() => undefined | CartKeySpecifier),
		fields?: CartFieldPolicy,
	},
	CartItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartItemKeySpecifier | (() => undefined | CartItemKeySpecifier),
		fields?: CartItemFieldPolicy,
	},
	CartResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CartResponseKeySpecifier | (() => undefined | CartResponseKeySpecifier),
		fields?: CartResponseFieldPolicy,
	},
	CheckPhotoResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CheckPhotoResponseKeySpecifier | (() => undefined | CheckPhotoResponseKeySpecifier),
		fields?: CheckPhotoResponseFieldPolicy,
	},
	Checklist?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChecklistKeySpecifier | (() => undefined | ChecklistKeySpecifier),
		fields?: ChecklistFieldPolicy,
	},
	ChecklistItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChecklistItemKeySpecifier | (() => undefined | ChecklistItemKeySpecifier),
		fields?: ChecklistItemFieldPolicy,
	},
	ChecklistResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ChecklistResponseKeySpecifier | (() => undefined | ChecklistResponseKeySpecifier),
		fields?: ChecklistResponseFieldPolicy,
	},
	CountriesResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CountriesResponseKeySpecifier | (() => undefined | CountriesResponseKeySpecifier),
		fields?: CountriesResponseFieldPolicy,
	},
	Country?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CountryKeySpecifier | (() => undefined | CountryKeySpecifier),
		fields?: CountryFieldPolicy,
	},
	CurrenciesResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CurrenciesResponseKeySpecifier | (() => undefined | CurrenciesResponseKeySpecifier),
		fields?: CurrenciesResponseFieldPolicy,
	},
	Currency?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CurrencyKeySpecifier | (() => undefined | CurrencyKeySpecifier),
		fields?: CurrencyFieldPolicy,
	},
	Dictionary?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DictionaryKeySpecifier | (() => undefined | DictionaryKeySpecifier),
		fields?: DictionaryFieldPolicy,
	},
	Dimensions?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DimensionsKeySpecifier | (() => undefined | DimensionsKeySpecifier),
		fields?: DimensionsFieldPolicy,
	},
	Entry?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EntryKeySpecifier | (() => undefined | EntryKeySpecifier),
		fields?: EntryFieldPolicy,
	},
	EntryPaginatedResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EntryPaginatedResponseKeySpecifier | (() => undefined | EntryPaginatedResponseKeySpecifier),
		fields?: EntryPaginatedResponseFieldPolicy,
	},
	EntryResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EntryResponseKeySpecifier | (() => undefined | EntryResponseKeySpecifier),
		fields?: EntryResponseFieldPolicy,
	},
	Eye?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EyeKeySpecifier | (() => undefined | EyeKeySpecifier),
		fields?: EyeFieldPolicy,
	},
	Form?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FormKeySpecifier | (() => undefined | FormKeySpecifier),
		fields?: FormFieldPolicy,
	},
	FormField?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FormFieldKeySpecifier | (() => undefined | FormFieldKeySpecifier),
		fields?: FormFieldFieldPolicy,
	},
	FormResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FormResponseKeySpecifier | (() => undefined | FormResponseKeySpecifier),
		fields?: FormResponseFieldPolicy,
	},
	FormStep?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FormStepKeySpecifier | (() => undefined | FormStepKeySpecifier),
		fields?: FormStepFieldPolicy,
	},
	Head?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | HeadKeySpecifier | (() => undefined | HeadKeySpecifier),
		fields?: HeadFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Option?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OptionKeySpecifier | (() => undefined | OptionKeySpecifier),
		fields?: OptionFieldPolicy,
	},
	Order?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderKeySpecifier | (() => undefined | OrderKeySpecifier),
		fields?: OrderFieldPolicy,
	},
	OrderEditRes?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderEditResKeySpecifier | (() => undefined | OrderEditResKeySpecifier),
		fields?: OrderEditResFieldPolicy,
	},
	OrderEditResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderEditResponseKeySpecifier | (() => undefined | OrderEditResponseKeySpecifier),
		fields?: OrderEditResponseFieldPolicy,
	},
	OrderItem?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderItemKeySpecifier | (() => undefined | OrderItemKeySpecifier),
		fields?: OrderItemFieldPolicy,
	},
	OrderPaginatedResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderPaginatedResponseKeySpecifier | (() => undefined | OrderPaginatedResponseKeySpecifier),
		fields?: OrderPaginatedResponseFieldPolicy,
	},
	OrderResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderResponseKeySpecifier | (() => undefined | OrderResponseKeySpecifier),
		fields?: OrderResponseFieldPolicy,
	},
	OrderShipStation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderShipStationKeySpecifier | (() => undefined | OrderShipStationKeySpecifier),
		fields?: OrderShipStationFieldPolicy,
	},
	OrderTrack?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OrderTrackKeySpecifier | (() => undefined | OrderTrackKeySpecifier),
		fields?: OrderTrackFieldPolicy,
	},
	PDocument?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PDocumentKeySpecifier | (() => undefined | PDocumentKeySpecifier),
		fields?: PDocumentFieldPolicy,
	},
	PDocumentResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PDocumentResponseKeySpecifier | (() => undefined | PDocumentResponseKeySpecifier),
		fields?: PDocumentResponseFieldPolicy,
	},
	PDocumentsResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PDocumentsResponseKeySpecifier | (() => undefined | PDocumentsResponseKeySpecifier),
		fields?: PDocumentsResponseFieldPolicy,
	},
	PaymentIntent?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentIntentKeySpecifier | (() => undefined | PaymentIntentKeySpecifier),
		fields?: PaymentIntentFieldPolicy,
	},
	PaymentIntentResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PaymentIntentResponseKeySpecifier | (() => undefined | PaymentIntentResponseKeySpecifier),
		fields?: PaymentIntentResponseFieldPolicy,
	},
	Position?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PositionKeySpecifier | (() => undefined | PositionKeySpecifier),
		fields?: PositionFieldPolicy,
	},
	Product?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductKeySpecifier | (() => undefined | ProductKeySpecifier),
		fields?: ProductFieldPolicy,
	},
	ProductsResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ProductsResponseKeySpecifier | (() => undefined | ProductsResponseKeySpecifier),
		fields?: ProductsResponseFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	ShipStationStatus?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ShipStationStatusKeySpecifier | (() => undefined | ShipStationStatusKeySpecifier),
		fields?: ShipStationStatusFieldPolicy,
	},
	ShippingAddress?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ShippingAddressKeySpecifier | (() => undefined | ShippingAddressKeySpecifier),
		fields?: ShippingAddressFieldPolicy,
	},
	ShippingAddressResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ShippingAddressResponseKeySpecifier | (() => undefined | ShippingAddressResponseKeySpecifier),
		fields?: ShippingAddressResponseFieldPolicy,
	},
	SignedUrl?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SignedUrlKeySpecifier | (() => undefined | SignedUrlKeySpecifier),
		fields?: SignedUrlFieldPolicy,
	},
	SignedUrlResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SignedUrlResponseKeySpecifier | (() => undefined | SignedUrlResponseKeySpecifier),
		fields?: SignedUrlResponseFieldPolicy,
	},
	Size?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SizeKeySpecifier | (() => undefined | SizeKeySpecifier),
		fields?: SizeFieldPolicy,
	},
	StringResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | StringResponseKeySpecifier | (() => undefined | StringResponseKeySpecifier),
		fields?: StringResponseFieldPolicy,
	},
	TestResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TestResultKeySpecifier | (() => undefined | TestResultKeySpecifier),
		fields?: TestResultFieldPolicy,
	},
	Token?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenKeySpecifier | (() => undefined | TokenKeySpecifier),
		fields?: TokenFieldPolicy,
	},
	TokenResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TokenResponseKeySpecifier | (() => undefined | TokenResponseKeySpecifier),
		fields?: TokenResponseFieldPolicy,
	},
	TrackStep?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TrackStepKeySpecifier | (() => undefined | TrackStepKeySpecifier),
		fields?: TrackStepFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserResponse?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserResponseKeySpecifier | (() => undefined | UserResponseKeySpecifier),
		fields?: UserResponseFieldPolicy,
	},
	ValidatedImage?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ValidatedImageKeySpecifier | (() => undefined | ValidatedImageKeySpecifier),
		fields?: ValidatedImageFieldPolicy,
	},
	Validation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ValidationKeySpecifier | (() => undefined | ValidationKeySpecifier),
		fields?: ValidationFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;