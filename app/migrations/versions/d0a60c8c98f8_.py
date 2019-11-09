"""empty message

Revision ID: d0a60c8c98f8
Revises: 9dd5ac2ea072
Create Date: 2018-10-01 16:29:24.527003

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd0a60c8c98f8'
down_revision = '9dd5ac2ea072'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('is_deactivated', sa.Boolean(), nullable=True))
    op.drop_column('user', 'is_deactiviated')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('is_deactiviated', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.drop_column('user', 'is_deactivated')
    # ### end Alembic commands ###
