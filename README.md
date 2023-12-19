
# Flexmoney-project

## This project is used to build an admission form for the Yoga Classes.

### Problem Statement:
Assume that you are the CTO for the outsourcing firm which has been chosen to build an
admission form for the Yoga Classes which happen every month.
Requirements for the admission form are:
- Only people within the age limit of 18-65 can enroll for the monthly classes and they will
be paying the fees on a month-on-month basis. I.e. an individual will have to pay the fees
every month and he can pay it any time of the month.
- They can enroll any day but they will have to pay for the entire month. The monthly fee is
500/- Rs INR.
- There are a total of 4 batches a day namely 6-7AM, 7-8AM, 8-9AM and 5-6PM. The
participants can choose any batch in a month and can move to any other batch next
month. I.e. participants can shift from one batch to another in different months but in
same month they need to be in same batch.


### Approach to the problem:

I have used the following technologies to build the website
- Frontend is built with **_React.js_**
- Backend is built with **_Node.js_**, **_Express.js_**
- Database - **_MongoDB_**
-   Additional Libraries: **Axios (for API requests), Toastify (for notifications)**


### Workflow

![Flowchart Template](https://user-images.githubusercontent.com/71181112/207106118-3265f721-1fd8-4ca6-872b-418e6268b245.jpg)

## Project Structure

The project is organized into four main components: 
1.  **Login Page (`Login.js`):** 
 - Opening page with email and password fields. 
 - Submit button checks user login and payment status. 
 - Redirects users based on login and payment status.
 - Signup button redirects to the registration page. 
2.  **Registration Page (`Registration.js`):** 
 - Form for users to provide details: Name, Email, Password, Phone, Age, Date, Batch Timings. 
 - Validates user input and age range (18-65). 
 - Registration button redirects to the payment page. 
3.  **Payments Page (`Payment.js`):** 
 - Displays a congratulations message and user details.
 - Form for users to fill in card details: Card Number, Card Holder Name, Expiry Date, CVV code. 
 - Validates card details before allowing payment. 
 - Make Payment button redirects to the confirmation page. 
4.  **Confirmation Page (`Confirmation.js`):**  
- Displays a success message and additional user details after payment. - Fetches user details from the backend.
 
 ## Frontend
Project Structure

<img width="116" alt="Screenshot_20221212_223951" src="https://user-images.githubusercontent.com/71181112/207109473-4bee0c30-1ee3-4177-85ba-d9bcd0aa17e7.png">



### Packages installed

<img width="269" alt="Screenshot_20221212_224143" src="https://user-images.githubusercontent.com/71181112/207113338-81e34fb5-c4ea-41a7-bd18-c7fd2f75fbb5.png">




## Backend

### Packages installed



### Project Structure


![image](https://user-images.githubusercontent.com/71181112/207114808-92a45eee-338b-4676-b8ef-105596630b51.png)


## API Endpoints  
-  `/api/login`: Handles user login.
-  `/api/register`: Handles user registration. 
-  `/api/payment`: Handles user payments. 
-  `/api/user/:id`: Retrieves user details by ID.

## External Function
  -  `CompletePayment()`: Mock function to handle payments.
  
## Database

### MongoDB
I have hosted my database in the mongoDB cloud.
There is one collection (table) in my database:
- **users**
#### Schema of Users Table


```
const  userSchema  =  new mongoose.Schema({

name: { type:  String, required:  true },

email: { type:  String, required:  true, unique:  true },

password: { type:  String, required:  true },

phone: { type:  String, required:  true },

age: { type:  Number, required:  true },

date: { type:  String, required:  true },

selectedBatch: { type:  String, required:  true },

feesPaid: { type:  Boolean, default:  false },

});
```



## ER Diagram of my database


<img width="658" alt="Screenshot_20221213_000522" src="https://user-images.githubusercontent.com/71181112/207162833-0dc6d654-22c7-4b87-b82c-9bd0e44e81e9.png">



<img width="735" alt="Screenshot_20221213_000812" src="https://user-images.githubusercontent.com/71181112/207162852-875aae52-cac3-4ad3-9e57-fcdd7ae0a111.png">
