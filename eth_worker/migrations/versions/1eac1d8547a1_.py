"""empty message

Revision ID: 1eac1d8547a1
Revises: 668cccfdad09
Create Date: 2019-09-15 18:59:35.788415

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1eac1d8547a1'
down_revision = '668cccfdad09'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('blockchain_address', 'address',
               existing_type=sa.VARCHAR(),
               nullable=False)
    op.create_index(op.f('ix_blockchain_address_address'), 'blockchain_address', ['address'], unique=True)
    op.add_column('blockchain_task', sa.Column('amount', sa.BigInteger(), nullable=True))
    op.add_column('blockchain_task', sa.Column('is_send_eth', sa.Boolean(), nullable=True))
    op.add_column('blockchain_task', sa.Column('recipient_address', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('blockchain_task', 'recipient_address')
    op.drop_column('blockchain_task', 'is_send_eth')
    op.drop_column('blockchain_task', 'amount')
    op.drop_index(op.f('ix_blockchain_address_address'), table_name='blockchain_address')
    op.alter_column('blockchain_address', 'address',
               existing_type=sa.VARCHAR(),
               nullable=True)
    # ### end Alembic commands ###
