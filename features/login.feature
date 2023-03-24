Feature: Login feature

    As an user I should be able to login with valid credentials

    @smoke
    Scenario: Should be able to login with valid credentials
        Given I navigate to login page
        And I enter username 'standard_user'
        And I enter password 'secret_sauce'
        When I click login button
        Then I will be navigated to home page
        And I click on the 'Sauce Labs Onesie'
        Then I click on the 'Add to cart'
        Then I click on the 'Removed'
