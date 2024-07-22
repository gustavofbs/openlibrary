import { initRealTimeValidation } from '../../../openlibrary/plugins/openlibrary/js/realtime_account_validation';

beforeEach(() => {
    document.body.innerHTML = `
    <form id="signup" name="signup" data-i18n='{"username_length_err": "Username must be between 3 and 20 characters", "username_char_err": "Username can only contain letters, numbers, dashes, and underscores"}'>
      <input type="text" id="username">
      <div id="usernameMessage" style="display:none"></div>
      <input type="text" id="emailAddr">
      <div id="passwordMessage" style="display:none"></div>
      <label for="password">Label for password</label>
      <input type="password" class="required" id="password">
    </form>
  `;
});

describe('Username tests', () => {
    let usernameField, usernameMessage;

    beforeEach(() => {
        // Call the function
        initRealTimeValidation();

        // Declare the elements
        usernameField = document.getElementById('username');
        usernameMessage = document.getElementById('usernameMessage');
    });

    test('validateUsername should update elements correctly for valid username', () => {
        // Set the username value
        usernameField.value = 'validUsername';

        // Trigger the blur event on the username field
        usernameField.dispatchEvent(new Event('blur'));

        // Assert that the elements have the expected classes and messages
        expect(usernameField.classList.contains('invalid')).toBe(false);
        expect(usernameMessage.textContent).toBe('');
    });

    test('validateUsername should show error for empty username', () => {
        // Set the username value
        usernameField.value = '';

        // Trigger the blur event on the username field
        usernameField.dispatchEvent(new Event('blur'));

        // Assert that the elements have the expected classes and messages
        expect(usernameField.classList.contains('invalid')).toBe(false);
        expect(usernameMessage.textContent).toBe('');
    });

    test('validateUsername should show error for username less than 3 chars', () => {
        // Set the username value
        usernameField.value = 'ab';

        // Trigger the blur event on the username field
        usernameField.dispatchEvent(new Event('blur'));

        // Assert that the elements have the expected classes and messages
        expect(usernameField.classList.contains('invalid')).toBe(true);
        expect(usernameMessage.textContent).toBe('Username must be between 3 and 20 characters');
    });

    test('validateUsername should show error for username more than 20 chars', () => {
        // Set the username value
        usernameField.value = 'a'.repeat(21);

        // Trigger the blur event on the username field
        usernameField.dispatchEvent(new Event('blur'));

        // Assert that the elements have the expected classes and messages
        expect(usernameField.classList.contains('invalid')).toBe(true);
        expect(usernameMessage.textContent).toBe('Username must be between 3 and 20 characters');
    });

    test('validateUsername should show error for invalid characters', () => {
        // Set the username value
        usernameField.value = 'invalid*char';

        // Trigger the blur event on the username field
        usernameField.dispatchEvent(new Event('blur'));

        // Assert that the elements have the expected classes and messages
        expect(usernameField.classList.contains('invalid')).toBe(true);
        expect(usernameMessage.textContent).toBe('Username can only contain letters, numbers, dashes, and underscores');
    });
});

describe('Password tests', () => {
    let label, passwordField

    beforeEach(() => {
        // call the function
        initRealTimeValidation();

        //declare the elements
        label = document.querySelector('label[for="password"]');
        passwordField = document.getElementById('password');
    })

    test('validatePassword should update elements correctly on success', () => {
        // set the password value
        passwordField.value = 'password123';

        // Trigger the blur event on the password field
        passwordField.dispatchEvent(new Event('blur'));

        // Assert that the elements have the expected classes
        expect(passwordField.classList.contains('required')).toBe(true);
        expect(passwordField.classList.contains('invalid')).toBe(false);
        expect(label.classList.length).toBe(0);
    });

    test('validatePassword should update elements correctly for empty fields', () => {
        // set the password value
        passwordField.value = '';

        // Trigger the blur event on the password field
        passwordField.dispatchEvent(new Event('blur'));

        // Assert that the elements have the expected classes
        expect(passwordField.classList.contains('required')).toBe(true);
        expect(passwordField.classList.contains('invalid')).toBe(false);
        expect(label.classList.contains('invalid')).toBe(false);
    });

    test('validatePassword should update elements correctly for passwords over 20 chars', () => {
        // set the password values
        passwordField.value = 'password1234567891011';

        // Trigger the blur event on the password fields
        passwordField.dispatchEvent(new Event('blur'));

        // Assert that the elements have the expected classes
        expect(passwordField.classList.contains('required')).toBe(true);
        expect(passwordField.classList.contains('invalid')).toBe(true);
        expect(label.classList.contains('invalid')).toBe(true);
    });

    test('validatePassword should update elements correctly for passwords under 3 chars', () => {
        // set the password values
        passwordField.value = 'pa';

        // Trigger the blur event on the password fields
        passwordField.dispatchEvent(new Event('blur'));

        // Assert that the elements have the expected classes
        expect(passwordField.classList.contains('required')).toBe(true);
        expect(passwordField.classList.contains('invalid')).toBe(true);
        expect(label.classList.contains('invalid')).toBe(true);
    });
});
