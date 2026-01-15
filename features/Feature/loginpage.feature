Feature: OpenMRS Login

  @login
  Scenario: Login sukses dengan memilih location
    Given user membuka halaman login OpenMRS
    When user input username "admin" dan password "Admin123"
    And user memilih location "Inpatient Ward"
    And user klik tombol login
    Then user berhasil login dan keluar dari halaman login

 @loginotherlocator
 Scenario Outline: Login sukses dengan memilih locator lain - <locationname>
    Given user membuka halaman login OpenMRS
    When user input username "admin" dan password "Admin123"
    And user memilih location "<locationname>"
    And user klik tombol login
    Then user berhasil login dan keluar dari halaman login
    And user klik tombol logout
    And user berhasil kembali ke halaman login
    
    Examples:
    |locationname|
    |Inpatient Ward| 
    |Isolation Ward|
    |Laboratory |
    |Outpatient Clinic|
    |Pharmacy|
    |Registration Desk|

 @negative @loginfailed
    Scenario: Login tidak berhasil <name> & <pass>
    Given user membuka halaman login OpenMRS
    When user input username "<name>" dan password "<pass>"
    And user memilih location "Inpatient Ward"
    And user klik tombol login 
    Then user melihat error login dan tetap di halaman login

    Examples: 
    |name|pass|
    ||admin|
    |admin||
    |admin|admin|
    |suka|Admin123|
    |suka|suka|


