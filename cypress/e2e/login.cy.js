/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email and password are wrong
 *   - should display homepage when email and password are correct
 */

describe('Login spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman login
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Login$/)
      .should('be.visible');
  });

  it('should display alert when email password  is empty', () => {
    // klik tombol login tanpa mengisi username
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi invalid
    cy.get('input[placeholder="Email"]:invalid');
    cy.get('input[placeholder="Password"]:invalid');
  });

  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('test567@gmail.com');

    // klik tombol login tanpa mengisi password
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi invalid
    cy.get('input[placeholder="Password"]:invalid');
  });

  it('should display alert when username and password are wrong', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('test567@gmail.com');

    // mengisi password yang salah
    cy.get('input[placeholder="Password"]').type('wrong_password');

    // menekan tombol Login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.get('p[id="error-message"]').contains('email or password is wrong');
  });

  it('should display homepage when username and password are correct', () => {
    // mengisi email
    cy.get('input[placeholder="Email"]').type('test456@gmail.com');

    // mengisi password
    cy.get('input[placeholder="Password"]').type('123456');

    // menekan tombol Login
    cy.get('button')
      .contains(/^Login$/)
      .click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('h2[id="kategori-popular"]')
      .contains('Kategori Popular')
      .should('be.visible');
    cy.get('p[id="logout"]').contains('Logout').should('be.visible');
  });
});
