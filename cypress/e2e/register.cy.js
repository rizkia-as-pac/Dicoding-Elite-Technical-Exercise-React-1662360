/**
 * - Login spec
 *   - should display login page correctly
 *   - should display alert when name is empty
 *   - should display alert when email is empty
 *   - should display alert when password is empty
 *   - should display alert when email already taken
 *   - should display login when success register
 */

describe('Register spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/register');
  });

  it('should display login page correctly', () => {
    // memverifikasi elemen yang harus tampak pada halaman register
    cy.get('input[placeholder="Nama"]').should('be.visible');
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button')
      .contains(/^Register$/)
      .should('be.visible');
  });

  it('should display alert when all fields is empty', () => {
    // klik tombol Register tanpa mengisi fields
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // memverifikasi invalid
    cy.get('input[placeholder="Nama"]:invalid');
    cy.get('input[placeholder="Email"]:invalid');
    cy.get('input[placeholder="Password"]:invalid');
  });

  it('should display alert when password is empty', () => {
    // mengisi email
    cy.get('input[placeholder="Nama"]').type('test');
    cy.get('input[placeholder="Email"]').type('test567@gmail.com');

    // klik tombol login tanpa mengisi password
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // memverifikasi invalid
    cy.get('input[placeholder="Password"]:invalid');
  });

  it('should display alert when email already taken', () => {
    // mengisi email
    cy.get('input[placeholder="Nama"]').type('test');
    cy.get('input[placeholder="Password"]').type('123456');

    // mengisi email yang sudah ada
    cy.get('input[placeholder="Email"]').type('test456@gmail.com');

    // menekan tombol Register
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // memverifikasi window.alert untuk menampilkan pesan dari API
    cy.get('p[id="error-message"]')
      .contains('email is already taken')
      .should('be.visible');
  });

  it('should display homepage when username and password are correct', () => {
    // mengisi email
    cy.get('input[placeholder="Nama"]').type('test');

    // mengisi email
    let randomString = (Math.random() + 1).toString(36).substring(2);
    cy.get('input[placeholder="Email"]').type(`${randomString}@gmail.com`);

    // mengisi password
    cy.get('input[placeholder="Password"]').type('123456');

    // menekan tombol Register
    cy.get('button')
      .contains(/^Register$/)
      .click();

    // memverifikasi bahwa elemen yang berada di homepage ditampilkan
    cy.get('div[id="login-page"]').should('be.visible');
  });
});
