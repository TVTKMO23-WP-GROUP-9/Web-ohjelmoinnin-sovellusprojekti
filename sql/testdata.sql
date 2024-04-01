
INSERT INTO Profile_ (profilename, password, email, profilepicurl, "timestamp", description) VALUES
-- id 1-5
('Viilipytty', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('Jankka', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('komediaa82', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('Eloton', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('vainse', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
-- id 6-10
('jokaToka', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('Mikk0', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('dramaqueen', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('kauhistus', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('Jest4s', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
-- id 11-15
('AaveMaria', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('siippa5', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('Pastilli', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('Huutista', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('salaakaton', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
-- id 16-20
('Kan-Joni', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('poikamies', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('Misu01', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('maitotee', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('lipettiin', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
-- id 21-23
('Jenna', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('Siilinpieru', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL),
('PaijaanSUA', 'hashed_password_here', NULL, NULL, CURRENT_TIMESTAMP, NULL);

INSERT INTO Group_ (groupname, groupexplanation, "timestamp") VALUES
-- id 1-5
('Ryhmärämä', 'kuvaus', CURRENT_TIMESTAMP),
('komediahullut', 'kuvaus', CURRENT_TIMESTAMP),
('tosimiesklubi', 'kuvaus', CURRENT_TIMESTAMP),
('Stadin Muuvissa', 'kuvaus', CURRENT_TIMESTAMP),
('SOTA-leffat', 'kuvaus', CURRENT_TIMESTAMP),
-- id 6-10
('Draamailijat', 'kuvaus', CURRENT_TIMESTAMP),
('kauhalla kauhuu', 'kuvaus', CURRENT_TIMESTAMP),
('Tampereen seudun leffailijat', 'kuvaus', CURRENT_TIMESTAMP),
('Leffatiistai', 'kuvaus', CURRENT_TIMESTAMP),
('Vain-sarjoja', 'kuvaus', CURRENT_TIMESTAMP),
-- id 11-15
('Suomalaista filmii', 'kuvaus', CURRENT_TIMESTAMP),
('lastenleffat', 'kuvaus', CURRENT_TIMESTAMP),
('Äksönittäret', 'kuvaus', CURRENT_TIMESTAMP),
('Hevosaiheiset elokuvat', 'kuvaus', CURRENT_TIMESTAMP),
('Oulun oikeamieliset', 'kuvaus', CURRENT_TIMESTAMP);

INSERT INTO Memberlist_ (profileid, mainuser, groupid, pending) VALUES

-- Ryhmä Ryhmärämä
('1', 1, '1', 0),
('2', 0, '1', 0),
('3', 0, '1', 0),
('21', 0, '1', 0),
('22', 0, '1', 0),
('23', 0, '1', 0),
-- Ryhmä komediahullut
('4', 1, '2', 0),
('18', 0, '2', 0),
('3', 0, '2', 0),
('17', 0, '2', 0),
('20', 0, '2', 0),
-- Ryhmä tosimiesklubi
('5', 1, '3', 0),
('6', 0, '3', 0),
('11', 0, '3', 0),
('12', 0, '3', 0),
('13', 0, '3', 0),
-- Ryhmä Stadin Muuvissa
('9', 1, '4', 0),
('7', 0, '4', 0),
('2', 0, '4', 0),
('8', 0, '4', 0),
('4', 0, '4', 0),
-- Ryhmä SOTA-leffat
('10', 1, '5', 0),
('15', 1, '5', 0),
('12', 0, '5', 0),
('16', 0, '5', 0),
('5', 0, '5', 0),
-- Ryhmä Draamailijat
('10', 1, '6', 0),
('21', 0, '6', 0),
('3', 0, '6', 0),
-- Ryhmä kauhalla kauhuu
('9', 1, '7', 0),
('14', 0, '7', 0),
('16', 0, '7', 0),
('12', 0, '7', 0),
('21', 0, '7', 0),
-- Ryhmä Tampereen seudun leffailijat
('12', 0, '8', 0),
('23', 1, '8', 0),
('2', 0, '8', 0),
('8', 0, '8', 0),
('7', 0, '8', 0),
-- Ryhmä Leffatiistai
('13', 0, '9', 0),
('10', 1, '9', 0),
('12', 0, '9', 0),
('23', 0, '9', 0),
-- Ryhmä Vain-sarjoja
('7', 1, '10', 0),
('2', 0, '10', 0),
('15', 0, '10', 0),
('10', 0, '10', 0),
-- Ryhmä Suomalaista filmii
('16', 0, '11', 0),
('18', 1, '11', 0),
('23', 0, '11', 0),
('21', 0, '11', 0),
('13', 0, '11', 0),
-- Ryhmä lastenleffat
('14', 1, '12', 0),
('16', 0, '12', 0),
('21', 0, '12', 0),
('2', 0, '12', 0),
-- Ryhmä Äksönittäret
('15', 1, '13', 0),
('22', 1, '13', 0),
('23', 0, '13', 0),
('10', 0, '13', 0),
('8', 0, '13', 0),
-- Ryhmä Hevosaiheiset elokuvat
('8', 1, '14', 0),
('7', 0, '14', 0),
('2', 0, '14', 0),
('16', 0, '14', 0),
('23', 0, '14', 0),
-- Ryhmä '15
('11', 1, '15', 0),
('10', 0, '15', 0),
('8', 0, '15', 0),
('18', 0, '15', 0),
('14', 0, '15', 0);

INSERT INTO Favorites_ (profileid, groupid, favoriteditem, showtime, "timestamp") VALUES
('1', '1', 'favorited_item_here', NULL, CURRENT_TIMESTAMP),
('2', '2', 'favorited_item_here', NULL, CURRENT_TIMESTAMP),
('3', '3', 'favorited_item_here', NULL, CURRENT_TIMESTAMP),
('4', '3', 'favorited_item_here', NULL, CURRENT_TIMESTAMP),
('5', '4', 'favorited_item_here', NULL, CURRENT_TIMESTAMP),
('6', '7', 'favorited_item_here', NULL, CURRENT_TIMESTAMP),
('7', '10', 'favorited_item_here', NULL, CURRENT_TIMESTAMP),
('8', '14', 'favorited_item_here', NULL, CURRENT_TIMESTAMP),
('9', '4', 'favorited_item_here', NULL, CURRENT_TIMESTAMP),
('10', '5', 'favorited_item_here', NULL, CURRENT_TIMESTAMP);

INSERT INTO Message_ (groupid, profileid, message, "timestamp") VALUES
('1', '1', 'Test message here', CURRENT_TIMESTAMP),
('2', '2', 'Test message here', CURRENT_TIMESTAMP),
('3', '3', 'Test message here', CURRENT_TIMESTAMP),
('4', '4', 'Test message here', CURRENT_TIMESTAMP),
('5', '5', 'Test message here', CURRENT_TIMESTAMP),
('6', '6', 'Test message here', CURRENT_TIMESTAMP),
('7', '7', 'Test message here', CURRENT_TIMESTAMP),
('8', '8', 'Test message here', CURRENT_TIMESTAMP),
('9', '9', 'Test message here', CURRENT_TIMESTAMP),
('10', '10', 'Test message here', CURRENT_TIMESTAMP),
('11', '11', 'Test message here', CURRENT_TIMESTAMP),
('12', '12', 'Test message here', CURRENT_TIMESTAMP),
('13', '13', 'Test message here', CURRENT_TIMESTAMP),
('14', '14', 'Test message here', CURRENT_TIMESTAMP),
('15', '15', 'Test message here', CURRENT_TIMESTAMP);

INSERT INTO Review_ (profileid, revieweditem, review, rating, "timestamp") VALUES
('1', 'reviewed_item_here', 'Test review', 5, CURRENT_TIMESTAMP),
('2', 'reviewed_item_here', 'Test review', 4, CURRENT_TIMESTAMP),
('3', 'reviewed_item_here', 'Test review', 3, CURRENT_TIMESTAMP),
('4', 'reviewed_item_here', 'Test review', 2, CURRENT_TIMESTAMP),
('5', 'reviewed_item_here', 'Test review', 4, CURRENT_TIMESTAMP),
('6', 'reviewed_item_here', 'Test review', 3, CURRENT_TIMESTAMP),
('7', 'reviewed_item_here', 'Test review', 5, CURRENT_TIMESTAMP),
('8', 'reviewed_item_here', 'Test review', 4, CURRENT_TIMESTAMP),
('9', 'reviewed_item_here', 'Test review', 3, CURRENT_TIMESTAMP),
('10', 'reviewed_item_here', 'Test review', 2, CURRENT_TIMESTAMP);
