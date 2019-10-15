"""
This file (test_token_api.py) contains the functional tests for the token blueprint.

These tests use GETs and POSTs to different URLs to check for the proper behavior
of the token blueprint.
"""
import json, pytest


@pytest.mark.parametrize("status_code", [
    (201),
    (400)
])
def test_create_token(test_client, complete_auth_token, status_code):
    """
    GIVEN a Flask application
    WHEN the '/api/token/' page is requested (GET)
    THEN check the response is valid
    """

    response = test_client.post('/api/token/',
                               headers=dict(Authorization=complete_auth_token, Accept='application/json'),
                               json={'address': '0xc4375b7de8af5a38a93548eb8453a498222c4ff2',
                                     'name': 'FOO Token',
                                     'symbol': 'FOO'},
                               follow_redirects=True)

    assert response.status_code == status_code