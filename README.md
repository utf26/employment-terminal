# Single-Page Application using Rails 7, SLIM, Hotwire, Stimulus, TurboFrames, Tailwind, MySQL, RSpec, and Faker

This application is a single-page application built using the following technology stack:

- Rails 7
- SLIM
- Hotwire
- Stimulus
- TurboFrames
- Tailwind
- MySQL
- RSpec
- Faker

This application allows users to enter their personal data and employment details. It has two modals that appear after
the user clicks on the "Personal Data" or "Employment" buttons.

### How to Launch the Application

1. Clone this repository onto your local machine.

```
git clone https://github.com/utf26/employment-terminal.git
```

2. Navigate to the project directory.

```
cd employment-terminal
```

3. Install the required dependencies.

```
bundle install
```

4. Setup the database.

```
rails db:create db:migrate
```

5. Start the server.

```
rails server
```

6. Visit http://localhost:3000 in your web browser to view the application.

### Personal Data Form

The personal data form contains the following entry fields:

- First Name (required, 25 characters limit)
- Last Name (required, 50 characters limit)
- Nickname (not required)
- Email Address (required)
- Phone Number (required)

The email field is dynamically validated as the user enters it. The error will appear below the field if the email is
not valid. The phone number is also validated and will automatically insert separators (XXX-XXX-XXXX).

After the form is saved, it automatically goes to the Employment form.

### Employment Form

The employment form contains the following entry fields:

- Employer (required)
- Date Started (required)
- Date Employment Ended (required)

The date fields have a calendar widget as well as manual input with field validation and automatic insertion of
separators (MM/DD/YYYY). There is an "Add Employment" button that adds a new set of employment fields. The "Save" button
is grayed out until all the required fields are filled.

After the form is saved, the user can view their personal data and employment details on the home page.

### Testing

RSpec is used for testing. To run the tests, enter the following command:

```rspec```

### Faker

Faker is used to generate fake data for testing. It is already included in the project dependencies.